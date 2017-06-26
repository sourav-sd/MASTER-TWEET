
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser').json();

var project = require('../.././model/db.js');


var Project = project.getProject();

router.post('/addProject',function(req,res){
    console.log(req.body);
    var newProject = new Project(req.body);
    /*-------------------- Set Header -----------------------*/

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.set("Content-Type",'application/json');

    newProject.save(function(err, Project){
        if(err){
            res.status(500).send();
        }
        else{
            res.send(Project);
            console.log('Project Added Successfully!');
        }
    });

});
router.get('/allProject',function(req,res){

    /*-------------------- Set Header -----------------------*/

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');


    Project.find({},function(err, Project){
        if(err){
            res.status(500).send();
        }
        else{
            res.send(Project);
            console.log(Project);
        }
    });

});

module.exports = router;
