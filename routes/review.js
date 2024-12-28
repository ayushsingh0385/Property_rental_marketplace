const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapasync.js");
const methodOverride=require("method-override");
router.use(methodOverride("_method"));
router.use(express.urlencoded({extended:true}));
const { createReview, deleteReview } = require("../controllers/reveiw.js");
const {isLoggedIn, isReviewOwner,reviewvalidateSchema}=require("../middlewares.js");

//create review
router.post("/",isLoggedIn,reviewvalidateSchema,wrapAsync(createReview))


//delete review
router.delete("/:rid",isLoggedIn,isReviewOwner,wrapAsync(deleteReview))

module.exports=router;