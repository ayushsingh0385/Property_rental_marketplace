const Expresserror=require("./utils/expresserror.js");
const express=require("express");
const MongoStore=require("connect-mongo")
const app=express();
const path=require("path");
const ejsmate=require("ejs-mate");
app.engine("ejs",ejsmate);
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const mongoose=require("mongoose");

//DOTENV FILE
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

//ATLAS CONNECTION
const dbUrl=process.env.ATLASDB_URL
// const dbUrl="mongodb://localhost:27017/wanderlust";


//AUTHENTICATION
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const session=require("express-session");
const flash=require("connect-flash");

//connect mongo store
const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
        touchAfter:24*60*60
    }
})

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})

//session options
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxage:7*24*60*60*1000,
        httpOnly:true
    }
}

//PHASE 2 IMP
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

//Use static serialize and deserialize of model for passport session support
//into the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//PHASE 2 IMP END

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

//Demo user open
app.get("/demouser",async(req,res)=>{
    let fakeuser=new User({
        email:"fakeuser@gmail.com",
        username:"fakeuser01",
    })

    const registeredUser=await User.register(fakeuser,"helloworld");
    res.send(registeredUser);
})
//Demo user close

//routes requiring
const listroutes=require("./routes/listing.js")
app.use("/listings",listroutes);

const reviewroutes=require("./routes/review.js");
app.use("/listings/:id/reviews",reviewroutes);

const authroute=require("./routes/user.js");
app.use("/",authroute);
//It is parent route
//set mergeParams:true in child router

//Server side schema validator


//conection happening

async function connect(){
    await mongoose.connect(dbUrl);
}

connect().then(() => {
    console.log("Connected to database wanderlust");
})
.catch((err) => {
    console.error(err);
});
app.listen(8080,()=>{
    console.log("Server listening on port : 8080");
});





//connection happened

//LISTING.JS FILE ROUTES

app.get("/",(req,res)=>{
    res.redirect("/listings");
})

// Creating custom error handler
app.all("*",(req,res,next)=>{
    next(new Expresserror(404,"Page not found"));
})
app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong"}=err;
    // throw new Expresserror(status,message);
    console.log("STARTOFERROR");
    console.log(err);
    console.log("ENDOFERROR");
    
    // console.log(statusCode);
    res.status(status).render("error",{err,status});

    // res.status(statusCode).send(message);
    // res.send("Page not found");
})
