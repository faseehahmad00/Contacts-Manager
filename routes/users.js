var express = require('express');
var router = express.Router();
var {User,Encrypt} = require('../models/users');
var {loginValidation , signupValidation} = require('../middlewares/user_validation');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config  = require('config');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');

/* GET users listing. */
router.get('/' ,async function(req, res, next) {
  let users = await User.find();
  res.send(users);
});

router.get('/:id', userAuth ,async function(req, res, next) {
  let user = await User.findById(req.params.id);
  res.send(user);
});

router.delete('/:id',userAuth,adminAuth,async function(req, res, next) {
  let user = await User.findById(req.params.id);
  await user.delete();
  res.send({});
});

router.put('/:id',signupValidation,userAuth,adminAuth,async function(req, res, next) {
  let user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = await Encrypt(req.body.password);
  user.role = req.body.role;
  a = await user.save();
  res.send(a);
});

router.post('/signup',signupValidation,async function(req, res, next) {
  let user = await User.findOne({"email":req.body.email});
  if(!user){
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = await Encrypt(req.body.password);
    user.role = req.body.role;
    await user.save();
    let {name,email}  = user ;
    res.status(200).send({name,email});
  }
  res.status(400).send("user already exist");

});

router.post('/login',loginValidation,async function(req, res, next) {
  let user = await User.findOne({"email":req.body.email});
  if(!user)
    res.status(400).send("invalid user or password"); 
  else
    console.log('user exists')
    if(await bcrypt.compare(req.body.password, user.password))
    {
    let token = jwt.sign({_id : user._id},config.get("privateKey"));
    res.send(token)
    }
    else
      return res.status(400).send("invalid password ");
});
 
module.exports = router;
