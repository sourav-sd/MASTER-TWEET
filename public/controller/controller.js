
var app = angular.module('project_management', []);
//'ui.router'
/*app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // =================  HOME  ======================= //
        .state('home', {
            url: '/home',
            templateUrl: '../index.html',
            controller: 'HomeCtrl'
        })

        // =================  Admin Dashboard  ======================= //
        .state('admin', {
            url: '/admin',
            templateUrl: '../AdminDashboard/index.html',
            controller: 'AdminCtrl'
        });
});*/

app.controller('HomeCtrl', function($scope,$http,$window,$timeout) {

    /*-------------------- Register ------------------------*/

    $scope.signUp = function(data, e){
        if(data.email == undefined || data.password == undefined){
            e.preventDefault();
            alert("Please fill all fields properly!");
        }
        else{
            $(document).on('click','#load2', function() {
                var $this = $(this);
                $this.button('loading');
            });
            console.log($scope.signup);
            $http.post('/register',$scope.signup).then(function(res){
                console.log(res);
                $('#load2').button('reset');
                $('#signUpModal').modal('hide');
                $scope.signup = '';
                $.notify({
                    // options
                    icon: 'fa fa-thumbs-up',
                    title: 'Registration Successful...',
                    message: 'Now you can login!',
                    url: '',
                    target: '_blank'
                });
            },function(err){
                $('#load2').button('reset');
                console.log(err);
                $.notify({
                    // options
                    icon: 'fa fa-thumbs-up',
                    title: 'Error...',
                    message: 'This Email already registered...',
                    url: '',
                    target: '_blank'
                },{
                    // settings
                    type: 'danger'
                });
            });
        }
    }

    //$window.location.href = 'prev files/demo.html';

    /*-------------------- Login ------------------------*/

    $scope.signIn = function(data, e){

        if(data.email == undefined || data.password == undefined){
            e.preventDefault();
            $.notify({
                // options
                icon: 'fa fa-thumbs-up',
                title: 'Error',
                message: 'Please fill all fields properly!!',
                url: '',
                target: '_blank'
            });
        }
        else{
            $(document).on('click','#load', function() {
                var $this = $(this);
                $this.button('loading');
            });
            console.log($scope.login);
            $http.post('/login',$scope.login).then(function(res){
                console.log(res);
                $('#load').button('reset');
                $('#signInModal').modal('hide');
                $scope.login = '';
                $.notify({
                    // options
                    icon: 'fa fa-thumbs-up',
                    title: 'Login Successful...',
                    message: 'Welcome Back!',
                    url: '',
                    target: '_blank'
                });
                $timeout(function(){
                    $window.location.href = 'AdminDashboard/index.html';
                },1100);
            },function(err){
                $('#load').button('reset');
                console.log(err);
                $.notify({
                    // options
                    icon: 'fa fa-thumbs-up',
                    title: 'Error...',
                    message: 'Incorrect Email and Password',
                    url: '',
                    target: '_blank'
                },{
                    // settings
                    type: 'danger'
                });
            });

        }
    }
});


app.controller('AdminCtrl', function($scope) {
    alert('ADMIN');
    window.onbeforeunload = function() {
        if(document.referrer == "http://localhost:3000/"){
            alert('zzz');
        }
    }
});