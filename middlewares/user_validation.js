const {validateLogin , validateSignup} = require("../models/users");

function loginValidation(req,res,next) {
    let {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error)
    next();
}

function SignupValidation(req,res,next) {
    let {error} = validateSignup(req.body);
    if(error) return res.status(400).send(error)
    next();
}
module.exports.loginValidation = loginValidation;
module.exports.signupValidation = SignupValidation;