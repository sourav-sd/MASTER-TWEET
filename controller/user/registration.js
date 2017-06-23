/**
 * Created by pradeepkar on 22/06/17.
 */

var express = require('express');
var router = express.Router();

var Person = require('../.././model/db.js');
var crypto = require('crypto');

var personModel = Person.getModel();
var getPersonSchema = Person.getPersonSchema();

router.post('/register', function(req,res){

    console.log(req.body);
    var newPerson = new personModel({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        role : req.body.role
    });
    var user_salt = crypto.randomBytes(16).toString('hex');
    var cryptPass = crypto.pbkdf2Sync(req.body.password, user_salt, 1000, 64).toString('hex');
    newPerson.salt = user_salt;
    newPerson.hash = cryptPass;
    newPerson.save(function(err, Person){
        if(err)
            res.status(500).send();
        else
            res.send(Person);
        console.log('Registered!');
    });

});



module.exports = router;

