const Listing=require("../models/listing.js");
const Review=require("../models/review.js")

module.exports.createReview=async(req,res)=>{
    console.log("review add request");
    const {id}=req.params;
    const{comment,rating}=req.body;
    console.log("review body",req.body);
    
    listingobj=await Listing.findById(id);
    console.log("id found");
    console.log(listingobj);
    console.log(listingobj.reviews);
    
    newreview=new Review({
        comment:comment,
        rating:rating,
        owner:req.user
    })
    console.log("review created");
    
    // console.log("list object",listingobj);
    
    console.log("review object",newreview);
    
    
    await listingobj.reviews.push(newreview);
    console.log("list object",await listingobj.populate("reviews"));
    console.log("list OWNER",listingobj.owner);
    await newreview.save();
    await listingobj.save();
    // console.log("list object",await listingobj.populate("reviews").populate("owner"));


    console.log("review saved");
    req.flash("success","New Review Created !");
    res.redirect(`/listings/${id}`);
}

//delete review
module.exports.deleteReview=async(req,res)=>{
    console.log("review delete req created");

    const{id,rid}=req.params;
    const temp=await Review.findByIdAndDelete(rid);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});
    console.log("REVIEW DELTED",temp);
    req.flash("success","Review deleted !");
    res.redirect(`/listings/${id}`);
}