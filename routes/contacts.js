var express = require('express');
var router = express.Router();
const { Contacts } = require('../models/contacts');
const contactValidation = require('../middlewares/contactValidation');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');

router.get('/usercontacts', userAuth , async function (req, res, next) {         //fetch contacts of certain user based on userid
    let page = Number(req.query.page ? req.query.page : 1) ;
    let perPage = Number(req.query.perPage ? req.query.perPage : 6) ;
    let contact = await Contacts.find({ userid: req.body.userid }).skip(perPage*(page-1)).limit(perPage);
    return res.send(contact)
});

router.get('/', userAuth, adminAuth, async function (req, res, next) {
    let contacts = await (Contacts.find());
    return res.send(contacts)
});

router.get('/:id', async function (req, res, next) {
    let contact = await (Contacts.findById(req.params.id));
    res.send(contact)
});

router.delete('/:id', userAuth, async function (req, res, next) {
    let contact = await (Contacts.findById(req.params.id));
    if (contact.userid == req.body.userid) {
        await contact.delete()
        return res.send(contact)
    }
    return res.status(400).send('invalid req')
});

router.put('/:id',userAuth, async function (req, res, next) {
    let contact = await (Contacts.findById(req.params.id));
    if (contact && contact.userid == req.body.userid) {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.address = req.body.address;
        contact.userid = req.body.userid;
        contact.save();
        return res.send(contact)
    }
    else
        return res.status(400).send('no such user')
});

router.post('/', userAuth, contactValidation, async function (req, res) {
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
