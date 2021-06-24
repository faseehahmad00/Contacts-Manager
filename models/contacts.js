const mongoose = require("mongoose");
const Joi = require('joi');

var contactsSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address : String,
    userid : String,
    url :{
        type:String,
        default:"https://res.cloudinary.com/dimm0px4q/image/upload/v1624545353/ConnectX/610-6104451_image-placeholder-png-user-profile-placeholder-image-png_mex8pb.jpg"
    }
});
const Contacts= mongoose.model("contacts",contactsSchema);

function validatecontact(data){
    const schema = Joi.object(
        {
            name:Joi.string().min(2).max(20).required(),
            email: Joi.string().email().min(3).required(),
            phone :Joi.string().min(5).pattern(/^[0-9]+$/).required(),
            address : Joi.string().min(2),
            userid :Joi.string().required(),
            url : Joi.string()
        }
    );
    return schema.validate(data,{abortEarly:false});
}

module.exports.Contacts = Contacts;
module.exports.validateContact = validatecontact;


