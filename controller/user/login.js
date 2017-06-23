/**
 * Created by pradeepkar on 22/06/17.
 */

var express = require('express');
var router = express.Router();

var Person = require('../.././model/db.js');
var crypto = require('crypto');

var personModel = Person.getModel();
var getPersonSchema = Person.getPersonSchema();



router.post('/login', function(req,res){
    console.log(req.body);

    personModel.findOne({email: req.body.email}, function(err, Person){
        if(err)
            res.status(500).send();
        else
        if(Person == null){
            console.log('not found');
            res.status(404).send();
        }
        else{
            if(Person){
                var pas_salt = Person.salt;
                var pas_hash = crypto.pbkdf2Sync(req.body.password, pas_salt, 1000, 64).toString('hex');

                if(pas_hash == Person.hash){
                    res.send(Person);
                    console.log('Logged In!');
                }
                else{
                    res.status(404).send();
                    console.log('wrong pass');
                }
            }
        }
    })
});



module.exports = router;

