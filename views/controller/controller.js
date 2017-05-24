
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.signUp = function(data, e){
        if(!data){
            e.preventDefault();
            console.log('Empty...');
        }
        else{
            console.log(data);
        }
    }

    $scope.signIn = function(data, e){
        if(!data){
            e.preventDefault();
        }
        else{
            console.log(data);
        }
    }
});