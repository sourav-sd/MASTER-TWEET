/**
 * Created by pradeepkar on 27/06/17.
 */
var app = angular.module('project_management', ['admin-controller','client-controller','developer-controller','ngRoute']);

/*======================= filter for time format ===============*/

app.filter("monthFilter",function(){
    return function(input){
        var formatted_day = moment(input).format('LL');
        var month_day = formatted_day.split(',')[0];
        var year = formatted_day.split(',')[1];
        var month = month_day.split(' ')[0];
        var day = month_day.split(' ')[1];
        return month;
    }
});
app.filter("dayFilter",function(){
    return function(input){
        var formatted_day = moment(input).format('LL');
        var month_day = formatted_day.split(',')[0];
        var year = formatted_day.split(',')[1];
        var month = month_day.split(' ')[0];
        var day = month_day.split(' ')[1];
        return day;
    }
});
app.filter("yearFilter",function(){
    return function(input){
        var formatted_day = moment(input).format('LL');
        var month_day = formatted_day.split(',')[0];
        var year = formatted_day.split(',')[1];
        var month = month_day.split(' ')[0];
        var day = month_day.split(' ')[1];
        return year;
    }
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/adminHome', {
            templateUrl: '../AdminDashboard/admin-home.html',
            controller: 'AdminCtrl'
        })
        .when('/projectDetails', {
            templateUrl: '../AdminDashboard/project-details.html',
            controller: 'ProjectDetailsCtrl'
        })
        .otherwise({
            redirectTo: '/adminHome'
        });
});

// ===================  Service  ======================= //

app.factory('userData', function() {

    var users = [];

    return {
        getUser: function() {
            return users;
        },
        addUser: function(newObj) {
            users.push(newObj);
            return true;
        }
    };
});