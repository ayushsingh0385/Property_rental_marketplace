const Listing=require("./models/listing.js")
const multer=require("multer");
const upload =multer({dest:"uploads/"});
const Review=require("./models/review.js");
const Expresserror=require("./utils/expresserror.js");
const {listingSchema,reviewSchema}=require("./schema.js")

module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        // req.path stores path and req.orignalUrl stores the orignal url where it was headed
        //storing this info in session
        req.session.redirectUrl=req.originalUrl;
        console.log("OLD",res.locals.redirectUrl);
        req.flash("error","You must be logged in to proceed !")
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl) res.locals.redirectUrl=req.session.redirectUrl;
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    const{id}=req.params;
    let listing=await Listing.findById(id);
    if(listing.owner!=req.user.id){
        req.flash("error","You aren't the owner of this listing !")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewOwner=async(req,res,next)=>{
    const{id,rid}=req.params;
    let review=await Review.findById(rid);
    if(review.owner!=req.user.id){
        req.flash("error","You aren't author of this review !")
        return res.redirect(`/listings/${id}`);
    }
    next();
}


// validation schema middleware
module.exports.validateSchema=(req,res,next)=>{
    console.log("befor",req.body,"while validating listing");
    
    let {error}= listingSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errmsg);
    }
    else{
        next();
    }
}

module.exports.reviewvalidateSchema=(req,res,next)=>{
    console.log(req.body,"while validating review");

    let {error}= reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errmsg);
    }
    else{
        next();
    }
}