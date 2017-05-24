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

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

 var personSchema = mongoose.Schema({
     name: String,
     address: String,
     email: String,
     password: String
 });

 var Person = mongoose.model("Person", personSchema);

app.get('/user', function(req, res){
    res.sendFile(path.join(__dirname+ '/views' + '/home.html'));
});

app.post('/user', function(req, res){
    var personInfo = req.body;
    var inputValue = req.body.btn;

    if(inputValue == 'signup'){
        if(!personInfo.name || !personInfo.address || !personInfo.email ||!personInfo.pwd){
            console.log("Empty Data!");
        }
        else{
            var newPerson = new Person({
                name: personInfo.name,
                address: personInfo.address,
                email: personInfo.email,
                password: personInfo.pwd
            });
            newPerson.save(function(err, Person){
                if(err)
                    res.send("Error please check again!!");
                else
                    res.send("Successfully Saved");
            });
            console.log(personInfo);
            console.log('Register!');
        }
    }
    else{
        if(!personInfo.email ||!personInfo.pwd){
            console.log("Empty Data!");
        }
        else{
            var email = personInfo.email;
            var password = personInfo.pwd;

            Person.findOne({email:email, password: password}, function(err, Person){
                if(err)
                    res.status(500).send();
                else
                    console.log(Person);
                    //res.send(Person);
            })
            console.log(personInfo);
            console.log('Login!');
        }
    }

});


var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});