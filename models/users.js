const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Joi = require('joi');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password : String,
    role : {
        type : String ,
        default : 'user'
    },
    url :{
        type:String,
        default:"https://res.cloudinary.com/dimm0px4q/image/upload/v1624545353/ConnectX/610-6104451_image-placeholder-png-user-profile-placeholder-image-png_mex8pb.jpg"
    }
});
const User= mongoose.model("users",userSchema);

function validatesignup(data){
    const schema = Joi.object(
        {
            name:Joi.string().min(2).max(20).required(),
            email: Joi.string().email().required(),
            password :Joi.string().min(3).max(20).required(),
            role : Joi.string().min(2),
            url : Joi.string()
        }
    );
    return schema.validate(data,{abortEarly:false});
}

function validatelogin(data){
    const schema = Joi.object(
        {
            email: Joi.string().email().min(0).required(),
            password :Joi.string().min(3).max(20).required()
        }
    );
    return schema.validate(data,{abortEarly:false});
}


async function encryptpassword(password){
    saltRounds = 10;
    password = bcrypt.hash(password, saltRounds);
    return password;    
}

module.exports.User = User;
module.exports.Encrypt = encryptpassword;
module.exports.validateLogin = validatelogin;
module.exports.validateSignup = validatesignup;


