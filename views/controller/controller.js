
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {

    if(localStorage.getItem('loggedin') == 1){
        $scope.showLogout = true;
        $scope.showLogin = false;
    }
    else{
        $scope.showLogout = false;
        $scope.showLogin = true;
    }

    $scope.showLoading = false;
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
            e.preventDefault();
            setTimeout(function(){
                location.reload();
            },5000);
            $scope.showLoading = true;
            $('#signInModal').modal('hide');
            localStorage.setItem('loggedin',1);
            console.log(data);
        }
    }
});