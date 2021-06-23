var express = require('express');
var router = express.Router();
const contactValidation = require('../middlewares/contactValidation');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');
const { Contacts } = require('../models/contacts');


//fetch contacts of certain user based on userid
router.get('/usercontacts', userAuth, async function (req, res) {
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 6);
    let contact = await Contacts.find({ userid: req.user._id }).skip(perPage * (page - 1)).limit(perPage);
    return res.send(contact)
});

//get all users (admin access only)
router.get('/', userAuth, adminAuth, async function (req, res) {
    let contacts = await (Contacts.find());
    return res.send(contacts)
});

//get contacts count of uer contacts
router.get('/usercontacts/count', userAuth , async function (req, res) {
    let count = await Contacts.countDocuments({ userid: req.user._id });
    return res.send(`${count}`)
});

//get a certain contact
router.get('/:id', async function (req, res, next) {
    let contact = await (Contacts.findById(req.params.id));
    return res.send(contact)
});

//delete a contact
router.delete('/:id', userAuth, async function (req, res) {
    let contact = await (Contacts.findById(req.params.id));
    if (contact.userid == req.user._id) {
        await contact.delete()
        return res.send(contact)
    }
    return res.status(400).send('invalid req')
});

//update contact
router.put('/:id', userAuth, async function (req, res) {
    let contact = await (Contacts.findById(req.params.id));
    if (contact && contact.userid == req.user._id) {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.address = req.body.address;
        contact.userid = req.user._id;
        contact.save();
        return res.send(contact)
    }
    return res.status(400).send('no such user')
});

//add new contact
router.post('/', userAuth, contactValidation, async function (req, res) {
    let contact = new Contacts();
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.address = req.body.address;
    contact.userid = req.user._id;
    a = await contact.save()
    return res.send(a)
})

module.exports = router;
