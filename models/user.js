const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalSchema=require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
})
// passport automatically adds a username,hash and salt field to store the username,
//the hashed password and the salt value

userSchema.plugin(passportLocalSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;