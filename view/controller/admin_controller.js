angular.module('admin-controller', [])




.controller('HomeCtrl', function($scope,$rootScope,$http,$window,$timeout,userData) {
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
            $http.post('/register/register',$scope.signup).then(function(res){
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
            $http.post('/login/login',$scope.login).then(function(res){
                console.log(res);
                $rootScope.user = res;

                userData.addUser({name: res.data.name, email: res.data.email, role: res.data.role});

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
})

.controller('AdminCtrl', function($scope,$rootScope,userData,$http,$location) {

    $scope.newMilestone = [];
    $scope.newTask = [];

    $scope.create_proj_head = 'Project Basic Information';
    $scope.projectAdd = false;

    $scope.step1 = true;
    $scope.step2 = false;
    $scope.step3 = false;

    $scope.goNext = function(val){
        if(val == 'step1'){
            $scope.create_proj_head = 'Project Detail Information';
            $scope.step1 = false;
            $scope.step2 = true;
            $scope.step3 = false;
        }
        if(val == 'step2'){
            $scope.create_proj_head = 'Project Task Details';
            $scope.step1 = false;
            $scope.step2 = false;
            $scope.step3 = true;
        }
    }

    /*------------------- Add/Remove MileStone --------------------------*/

    $scope.addMilestone = function(){
        var newItemNo = $scope.newMilestone.length + 1;
        $scope.newMilestone.push({
            'id': newItemNo
        });
        $scope.project.details.milestone = $scope.newMilestone;

    }

    $scope.removeMilestone = function(index) {
        $scope.newMilestone.splice(index, 1);
    };


    /*----------------------- Add/Remove New Task --------------------------*/

    $scope.addTask = function(){
        var newItemNo = $scope.newTask.length + 1;
        $scope.newTask.push({
            'id': newItemNo
        });
        $scope.project.task = $scope.newTask;

    };

    $scope.removeTask = function(index) {
        $scope.newTask.splice(index, 1);
    };


    /*------------------------- Add New Project --------------------------*/

    $scope.newProject = function(){
        if($scope.projectAdd == false){
            $scope.projectAdd = true;
        }
        else{
            $scope.projectAdd = false;
        }

    }

    /*------------------------- Create New Project --------------------------*/

    $scope.createProject = function(){
        $scope.project.basic.create_date=new Date();
        $http.post('/project/addProject', $scope.project).then(function(res){
            console.log(res);
            $scope.projectAdd = false;
        });

    };


    /*------------------------ Get all project ---------------------------*/

    $scope.getAllProject =function(){
        $http.get('/project/allProject').then(function(res){
            console.log(res);
            $scope.projects = res.data;
        });
    };
    $scope.getAllProject();

    /*------------------------ Animate Progress bar ---------------------------*/

    $scope.animateProgressBar =function(){
        $scope.progress_val = 0;
        setInterval(function(){
            if($scope.progress_val < 55){
                $scope.progress_val = 1+$scope.progress_val;
                document.getElementById('projectProgress').value = $scope.progress_val;
            }

        },30)
    };
    $scope.animateProgressBar();

    /*------------------------ Navigate to Project Details Page ---------------------------- */

    $scope.goProject = function(project_id){
        $rootScope.project_id = project_id;
        //console.log($rootScope.project_id);
        $location.path( "/projectDetails" );
    }

})
.controller("ProjectDetailsCtrl", function($http,$scope,$rootScope){
    console.log($rootScope.project_id);
    $http.get('/project/getProjectById/'+ $rootScope.project_id).then(function(res){
        console.log(res);
    });
});