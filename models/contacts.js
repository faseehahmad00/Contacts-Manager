const mongoose = require("mongoose");
const Joi = require('joi');

var contactsSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address : String,
    userid : String
});
const Contacts= mongoose.model("contacts",contactsSchema);

function validatecontact(data){
    const schema = Joi.object(
        {
            name:Joi.string().min(2).max(20).required(),
            email: Joi.string().email().min(0).required(),
            phone :Joi.string().min(5).pattern(/^[0-9]+$/).required(),
            address : Joi.string().min(2),
            userid :Joi.string().required()
        }
    );
    return schema.validate(data,{abortEarly:false});
}

module.exports.Contacts = Contacts;
module.exports.validateContact = validatecontact;


