
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://sourav_dutta:delgence55@ds159371.mlab.com:59371/project_management');

var db = mongoose.connection;

db.once('open', function() {
    console.log('MongoDB Successfully Connected!!');
});


/*================== User schema ==============*/

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
var Person = mongoose.model("Users", personSchema);

/*-------------------------- Project Schema ----------------*/
/*var projectSchema = mongoose.Schema({
    basic:{
            name: {type: String,required: true},
            about: {type: String,required: true},
            clientId:{type: String,required: true},        // later on change this string to mongoose.Schema.ObjectId
            end_date: {type: Date,required: true},
            start_date : {type: Date,required: true},
            priority: String
    },
    details:{
            description:{type: String,required: true},
            milestone:[{
                milestone_name: { type: String, required: true },
                milestone_desc: { type: String, required: true }
            }]
    },
    task:[{
        task_name: { type: String, required: true },
        task_desc: { type: String, required: true },
        assigned_developer: String,      // later on change this string to mongoose.Schema.ObjectId
        task_start_date: Date,
        task_end_date: Date
    }]
});*/
var projectSchema = mongoose.Schema({
    basic:{
        name: {type: String,unique: true,required: true},
        about: {type: String,required: true},
        clientId:{type: String,required: true},        // later on change this string to mongoose.Schema.ObjectId
        end_date: {type: Date,required: true},
        start_date : {type: Date,required: true},
        priority: String
    },
    details:{
        description:{type: String,required: true},
        milestone:[{
            milestone_name: { type: String, required: true },
            milestone_desc: { type: String, required: true }
        }]
    },
    task:[{
        task_name: { type: String, required: true },
        task_desc: { type: String, required: true },
        assigned_developer: String,      // later on change this string to mongoose.Schema.ObjectId
        task_start_date: Date,
        task_end_date: Date
    }]
});

var Project = mongoose.model("Projects", projectSchema);

module.exports = {
    getModel: function(){
        return Person;
    },
    getPersonSchema: function(){
        return personSchema;
    },
    getProject:function(){
        return Project;
    }
};

