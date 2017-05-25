
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http) {

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
            $http.post('/register',$scope.signup).then(function(res){
                console.log(res);
            });
            console.log($scope.signup);
        }
    }

    $scope.signIn = function(data, e){
        if(data.email == undefined || data.password == undefined){
            e.preventDefault();
            alert("Please fill all fields properly!");
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
            },function(err){
                $('#load').button('reset');
                console.log(err);
            });

        }
    }
});