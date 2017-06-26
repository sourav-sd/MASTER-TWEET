var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');
var crypto = require('crypto');



app.use(express.static(__dirname + '/view'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/*================ linking all controller js file ========================*/
login = require('./controller/user/login.js');
register = require('./controller/user/registration.js');
project = require('./controller/project/project.js');


/*================ connect to the controller js file with respect to the url  ========================*/
app.use('/login', login);
app.use('/register',register);
app.use('/project',project);


app.listen(8080, function () {
	 console.log( "Server Running Successfully on 8080" );
});