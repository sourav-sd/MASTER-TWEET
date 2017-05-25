var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://sourav55:delgence55@ds149551.mlab.com:49551/master_tweet');

var db = mongoose.connection;

db.once('open', function() {
    console.log('MongoDB Successfully Connected!!');
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var personSchema = mongoose.Schema({
    name: String,
    address: String,
    email: String,
    password: String
});

var Person = mongoose.model("Person", personSchema);


app.post('/register', function(req,res){
    console.log(req.body);
    var newPerson = new Person({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password
    });
    newPerson.save(function(err, Person){
        if(err)
            res.send("Error please check again!!");
        else
            res.send(Person);
        console.log('Registered!');
    });

});


app.post('/login', function(req,res){
    console.log(req.body);
    Person.findOne(req.body, function(err, Person){
        if(err)
            res.status(500).send();
        else
        if(Person == null){
            console.log('not found');
            res.status(404).send();
        }
        else{
            console.log(Person);
            res.send(Person);
            console.log('Logged In!');
        }
    })
});


var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});