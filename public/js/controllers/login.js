app.controller('LoginCtrl', ['$scope','MainService','$stateParams','$location', function($scope,MainService,$stateParams,$location){
	$scope.hide=true;
	MainService.authorized().success(function(data,status){
		if(status==200){
			$location.url('/home');
		}
	}).error(function(data,status){
		if(status==401){
			$scope.hide=false;
		}
	})
	$scope.makeValid=function(){
		$scope.usernameEmpty=false;
		$scope.passwordEmpty=false;
	}
	$scope.login=function(){
		if(!$scope.user){
			$scope.usernameEmpty=true;
			$scope.passwordEmpty=true;
			return;
		}
		if(!$scope.user.username){
			$scope.usernameEmpty=true;
			return;			
		}
		if(!$scope.user.password){
			$scope.passwordEmpty=true;
			return;			
		}
		delete $scope.error;
		MainService.login($scope.user).success(function(data,status){
			$location.url('/home');
		}).error(function(data,status){
			$scope.error={};
			switch (data.error){
				case 'incorrectUsername':
					$scope.error.username=true;
					break;
				case 'incorrectPassword':
					$scope.error.password=true;
					break;
				default:
					break;
			}
		});
	}

	$scope.checkUsernames=function(){
		$scope.usernameError=false;
		$scope.usernameEmpty=false;
		$scope.usernameMinLength=false;
		if(!$scope.usernameToRegistr){
			$scope.usernameEmpty=true;
			return true;
		}
		if($scope.usernameToRegistr.length<4){
			$scope.usernameMinLength=true;
			return true;
		}
		if($scope.usernameToRegistr.length>=4){
			MainService.checkUsernames({'username':$scope.usernameToRegistr}).success(function(data,status){
				if(status==200){
					$scope.usernameError=true;
					return true;
				}
			});
		}
		return false;
	}	
	$scope.checkPasswords=function(){
		$scope.passwordsEmpty=false;
		$scope.minLengthErr=false;
		$scope.notEqual=false;
		var flag=false;
		if(!$scope.firstPassword || !$scope.secondPassword){
			return;
		}
		if($scope.firstPassword.length<8 || $scope.secondPassword.length<8){
			$scope.minLengthErr=true;
			flag=true;
		}
		if($scope.firstPassword!=$scope.secondPassword){
			$scope.notEqual=true;
			flag=true;
		}
		return !flag;
	}
	$scope.registration=function(){
		if(!$scope.checkUsernames()){
			if(!$scope.firstPassword || !$scope.secondPassword){
				$scope.passwordsEmpty=true;
				return;
			}
			if(!$scope.checkPasswords()){
				return;
			}
			$scope.registerUser={
				'username': $scope.usernameToRegistr,
				'firstPassword': $scope.firstPassword,
				'secondPassword':$scope.secondPassword
			}
			MainService.registration($scope.registerUser).success(function(data,status){
				alert('Sign Up successfully');
			}).error(function(data,status){
				alert('Sorry,An error has occurred');
			})
		}
	}
}]);