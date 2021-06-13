var jwt = require('jsonwebtoken');
const config  = require('config');
const {User} = require('../models/users');

async function verifyAdmin(req,res,next) {
  if(req.user.role === 'admin')
    return next();
  res.status(403).send('not authorized');  
}

module.exports = verifyAdmin ;