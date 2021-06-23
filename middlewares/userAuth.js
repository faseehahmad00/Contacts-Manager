//This middle ware authenticated the user and supplies userid on runtime to req-body

var jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/users');

async function userAuth(req, res, next) {
    let token = req.header("auth-token");
    if (!token) return res.status(400).send("token not provided")
    try {
        let user = jwt.verify(token, config.get("privateKey"));
        req.user = await User.findById(user._id);
        if (!req.user)
            return res.status(403).send("invalid token");
    } catch (err) {
        res.status(401).send("something went wrong")
    }
    next()

}

module.exports = userAuth;