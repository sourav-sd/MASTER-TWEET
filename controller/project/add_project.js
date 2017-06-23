/**
 * Created by pradeepkar on 23/06/17.
 */


var express = require('express');
var router = express.Router();

var project = require('../.././model/db.js');


var Project = project.getProject();

router.post('/project', function(req,res){
    console.log('Project data  ', req.body);
});



module.exports = router;
