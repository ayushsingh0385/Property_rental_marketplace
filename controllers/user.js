const User=require("../models/user.js");

module.exports.getSignUpPage=async(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.doSignUp=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser= await User.register(newUser,password);
        console.log("reguser",registeredUser);
        
        req.login(registeredUser,(err)=>{
            if(err) return next(err);
            console.log("user loggeddddddddddddd");  
            console.log("after signlogin",req.user);
            req.flash("success","Welcome to Wanderlust !");
            res.redirect("/listings");
        })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

//Log In
module.exports.getLogInPage=async(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.doLogIn=async(req,res)=>{
    req.flash("success","You're logged in !");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    console.log("NEW",res.locals.redirectUrl);
    console.log("req.user",req.user);
    console.log("req.session",req.session);
    
    
    res.redirect(redirectUrl);
}
// problem arise that directly using req.session.redirectUrl doesn't works as 
// passport.authenticate resets the session

//Log Out
module.exports.doLogOut=async(req,res)=>{
    req.logout((err)=>{
        if(err) return next(err);
        req.flash("success","You are logged out !");
        res.redirect("/listings")
    })
}