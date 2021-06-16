const {validateContact} = require('../models/contacts');

function contactValidation(req,res,next) {
    let {error} = validateContact(req.body);
    if(error) return res.status(400).send(error)
    next();
}

module.exports = contactValidation;