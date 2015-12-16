app.controller('ChangeProfileCtrl', ['$scope','$location','MainService','socket',function($scope,$location,MainService,socket){
	MainService.user().success(function(data,status){
		$scope.myUsername=data.name;
		$scope.usernameToEdit=data.name;
		$scope.visible=true;
	})
	$scope.checkUsernames=function(){
		$scope.usernameError=false;
		$scope.usernameEmpty=false;
		$scope.usernameMinLength=false;
		if(!this.usernameToEdit){
			$scope.usernameEmpty=true;
			return true;
		}
		if(this.usernameToEdit.length<4){
			$scope.usernameMinLength=true;
			return true;
		}
		if(this.usernameToEdit.length>=4){
			if(this.usernameToEdit!=$scope.myUsername){
				MainService.checkUsernames({'username':this.usernameToEdit}).success(function(data,status){
					if(status==200){
						$scope.usernameError=true;
						return true;
					}
				});
			}
		}
		return false;
	}	
	$scope.changeUsername=function(){
		if(!$scope.checkUsernames()){
			MainService.changeUsername({'username':this.usernameToEdit}).success(function(data,status){
				MainService.user().success(function(data,status){
					$scope.myUsername=data.name;
					$scope.usernameToEdit=data.name;
					$scope.visible=true;
				})
				$('.closeProfmod').click();
				alert('Username successfully changed');
			}).error(function(){
				alert('Sorry,An error has occurred');
				$('.closeProfmod').click();
			})
		}
	}
	$scope.changePassword=function(){
		$scope.passwordsEmpty=false;
		$scope.minLengthErr=false;
		$scope.notEqual=false;
		if(!this.firstPassword || !this.secondPassword){
			$scope.passwordsEmpty=true;
			return;
		}
		if(this.firstPassword.length<8 || this.secondPassword.length<8){
			$scope.minLengthErr=true;
			return;
		}
		if(this.firstPassword!=this.secondPassword){
			$scope.notEqual=true;
			return;
		}
		var passwords={
			'firstPassword': this.firstPassword,
			'secondPassword': this.secondPassword
		}
		MainService.changePassword(passwords).success(function(data,status){
			alert('Password successfully changed');
			$('.closeProfmod').click();
		}).error(function(){
			alert('Sorry,An error has occurred');
			$('.closeProfmod').click();
		})
	}
}]);