const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapasync.js");

const methodOverride=require("method-override");
router.use(methodOverride("_method"));
router.use(express.urlencoded({extended:true}));

//cloudinary require
const {storage}=require("../cloudconfig.js")
//MULTER FOR FILE UPLOAD
const multer=require("multer");
const upload =multer({storage});
//initialization where uploads will be saved
//upload.single("imageUploadName") with filename as a middleware to save insisde a folder;

const {isLoggedIn,isOwner,validateSchema}=require("../middlewares.js");
const {createListingPage, createListing, deleteListing, getListingPage, getListing, getAllListing, getIdListing}=require("../controllers/listing.js")

//create routes
router.route("/new")
.get(isLoggedIn,wrapAsync(createListingPage))
.post(isLoggedIn,upload.single("imageUploadFile"),validateSchema,wrapAsync(createListing))
// .post(upload.single("imageUploadFile"),(req,res)=>{
//     console.log(req.file);
//     res.send(req.file);
// })

//delete routes
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(deleteListing))

//edit routes
router.route("/edit/:id")
.get(isLoggedIn,wrapAsync(getListingPage))
.put(isLoggedIn,isOwner,upload.single("imageUploadFile"),validateSchema,wrapAsync(getListing))

//get routes
router.get("/",wrapAsync(getAllListing))
router.get("/:id",wrapAsync(getIdListing))

module.exports=router;