var express = require('express');
var router = express.Router();
const {Contacts} = require('../models/contacts');
const contactValidation = require('../middlewares/contactValidation');

router.get('/' ,async function(req, res, next) {
    let contacts = await(Contacts.find());
    res.send(contacts)
  });

router.get('/:id' ,async function(req, res, next) {
    let contact = await(Contacts.findById(req.params.id));
    res.send(contact)
});

router.get('/user/:id' ,async function(req, res, next) {         //fetch contacts of certain user based on userid
    let contact = await(Contacts.find({userid : req.params.id}));
    res.send(contact)
});

router.delete('/:id' ,async function(req, res, next) {
    let contact = await(Contacts.findByIdAndDelete(req.params.id));
    res.send(contact)
});

router.put('/:id' ,async function(req, res, next) {
    let contact = await(Contacts.findById(req.params.id));
    if(contact)
        {   
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.address = req.body.address;
        contact.userid = req.body.userid;
        a = contact.save();
        return res.send(a)}
    else
        res.status(400).send('no such user')
});

router.post('/' ,contactValidation,async function(req,res){
    let contact = new Contacts();
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.address = req.body.address;
    contact.userid = req.body.userid;
    a = await contact.save()
    return res.send(a)
})
  
module.exports = router;
