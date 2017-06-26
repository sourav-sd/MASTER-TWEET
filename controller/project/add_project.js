/**
 * Created by pradeepkar on 23/06/17.
 */


var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser').json();

var project = require('../.././model/db.js');


var Project = project.getProject();

router.post('/project',bodyParser, function(req,res){
    console.log(Project);
    var newProject = new Project(/*{
        basic:[{
            name: req.body.basic.name,
            about: req.body.basic.about,
            clientId:req.body.basic.clientId,
            end_date: req.body.basic.end_date,
            start_date : req.body.basic.start_date,
            priority: req.body.basic.priority
        }],
        details:[{
            description:{type: String,required: true},
            milestone:[{
                milestone_name: { type: String, required: true },
                milestone_desc: { type: String, required: true }
            }]
        }],
        task:[{
            task_name: { type: String, required: true },
            task_desc: { type: String, required: true },
            assigned_developer: mongoose.Schema.ObjectId,
            task_start_date: Date,
            task_end_date: Date
        }]
    }*/req.body);
    newProject.save(function(err, Project){
        if(err)
            //console.log('error');
            res.status(500).send();

        else
            res.send(Project);
            console.log('Project Add!');
    });

});



module.exports = router;
