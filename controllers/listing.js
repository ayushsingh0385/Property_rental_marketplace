const Listing=require("../models/listing.js");

//get routes
module.exports.getAllListing=async(req,res)=>{
    const listings=await Listing.find({})
    res.render("listings/index.ejs",{listings});
}

module.exports.getIdListing=async(req,res)=>{
    const{id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:"owner"}).populate("owner");
    if(!listing){
        req.flash("error","This Listing does not exist !!!");
        res.redirect("/listings");
    }

    const location=encodeURIComponent(listing.location);
    console.log("templocation",listing.location);
    const url="https://nominatim.openstreetmap.org/search?q="+location+"&format=json&limit=1";
    console.log("url",url);
    const temp=await fetch(url);
    console.log("temp",temp);
    const geocode=await temp.json();
    console.log("geocode",geocode,geocode.lat,geocode.lon);
    const coordinates=[Number(geocode[0].lat),Number(geocode[0].lon)];
    console.log("coordinates",coordinates);
    res.render("listings/show.ejs",{listing,coordinates});
}

//edit routes
module.exports.getListingPage=async(req,res)=>{
    // console.log("EDIT PAGE ENTERED");
    const {id}=req.params;
    const listing=await Listing.findById(id);
    // console.log("EDIT---------",res.locals.redirectUrl);
    let imageUrl=listing.image.url;
    imageUrl=imageUrl.replace("/upload","/upload/c_fill,h_200,w_300")
    
    res.render("listings/edit.ejs",{listing,imageUrl});
}
// using try and catch
// router.put("/edit/:id",async(req,res,next)=>{
//     try{
//     const {id}=req.params;
//     const{text,des,price,location,country}=req.body;
//     const listing=await Listing.findByIdAndUpdate(id,{
//         title:text,
//         description:des,
//         price:price,
//         location:location,
//         country:country
//     });

//     res.redirect(`/${id}`);
//     }
//     catch(err){
//         next(err);
//     }
// })
module.exports.getListing=async(req,res)=>{
    // console.log("Edit request created");
    const {id}=req.params;
    const{text,des,price,location,country}=req.body;
    // console.log(req.body);
    const tempobj=await Listing.findByIdAndUpdate(id,{
        title:text,
        description:des,
        price:price,
        location:location,
        country:country
    },{runValidators:true,upsert:true});

    if(typeof req.file!="undefined"){
        console.log("req file entered ......");
        
        let url=req.file.path;
        let filename=req.file.filename;

        console.log("url",url);
        console.log("filename",filename);
        tempobj.image={url,filename};
        tempobj.save();
    }
    req.flash("success","Listing Edited !");

    res.redirect(`/listings/${id}`);
   
}

//create routes
module.exports.createListingPage=async(req,res)=>{
    // console.log("UPDATE---------",res.locals.redirectUrl);
    // console.log("req.user",req.user);
    // console.log("req.session",req.session);
    res.render("listings/new.ejs");
}

module.exports.createListing=async(req,res)=>{
    // console.log("New request created");

    // instead of this validateListing is now passed as a middleware to every request
    // let result=listingSchema.validate(req.body);
    // if(result.error) throw new Expresserror(400,result.error);
    
    let url=req.file.path;
    let filename=req.file.filename;

    console.log("url",url);
    console.log("filename",filename);

    const{text,des,price,location,country}=req.body;
    const tempobj=new Listing({
        title:text,
        description:des,
        price:price,
        image:{
            url,
            filename
        },
        location:location,
        country:country,
        owner:req.user
    });

    await tempobj.save();
    req.flash("success","New Listing created !");
    res.redirect(`/listings`);
   
}

// delete routes
module.exports.deleteListing=async(req,res)=>{
    // console.log("delete request created");
    
    const {id}=req.params;
    const temp=await Listing.findByIdAndDelete(id);
    // console.log("objjjjjj",temp);
    req.flash("success","Listing deleted !");
    res.redirect(`/listings`);
}