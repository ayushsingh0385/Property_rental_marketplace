const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapasync.js");
router.use(express.urlencoded({extended:true}));
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const { getSignUpPage, doSignUp, getLogInPage, doLogIn, doLogOut } = require("../controllers/user.js");

//Sign Up
router.route("/signup")
.get(wrapAsync(getSignUpPage))
.post(wrapAsync(doSignUp))

//Log In
router.route("/login")
.get(wrapAsync(getLogInPage))
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(doLogIn));

//Log Out
router.get("/logout",wrapAsync(doLogOut))

module.exports=router;