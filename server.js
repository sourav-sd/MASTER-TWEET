var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var crypto = require('crypto');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://sourav_dutta:delgence55@ds159371.mlab.com:59371/project_management');

var db = mongoose.connection;

db.once('open', function() {
    console.log('MongoDB Successfully Connected!!');
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

personSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

personSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

var Person = mongoose.model("Users", personSchema);


app.post('/register', function(req,res){

    console.log(req.body);
    var newPerson = new Person({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        role : req.body.role
    });
    var cryptPass = newPerson.setPassword(req.body.password);
    console.log(cryptPass);
    newPerson.save(function(err, Person){
        if(err)
            res.status(500).send();
        else
            res.send(Person);
        console.log('Registered!');
    });

});


app.post('/login', function(req,res){
    console.log(req.body);
    Person.findOne({email: req.body.email}, function(err, Person){
        if(err)
            res.status(500).send();
        else
        if(Person == null){
            console.log('not found');
            res.status(404).send();
        }
        else{

            if (!Person.validPassword(req.body.password)) {
                console.log('wrong pass');
            }
           else{
                console.log(Person);
                res.send(Person);
                console.log('Logged In!');
            }
        }
    })
});


var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});