app.controller('CompaniesCtrl', ['$scope','$location','MainService', function($scope,$location,MainService){
	MainService.authorized().
		success(function(){
			getCompanies();
		})
		.error(function(){
			$location.url('/login');
		});
	function getCompanies(){
			MainService.user().success(function(data,status){
				if(status===200){
					if(data.role==="admin" || data.role==="moderator"){
						$scope.canEdit=true;
					} 
				}
			});
			MainService.companies().success(function(data,status){
				$scope.companies=data;
				$scope.visible=true;
			})
	}
	$scope.makeValid=function(){
		$scope.nameError=false;
	}
	$scope.deleteCompany=function(id){
		MainService.deleteCompany(id).success(function(){
			if($scope.companies){
				$scope.companies=$scope.companies.filter(function(item){
					return (item.company_id==id) ? false : true;
				})
			}
		}).error(function(data,status){
			if(status==500){
				alert('Error while deleting company');
			}
		})
	}
	$scope.addNewCompany=function(){
		MainService.addCompany(this.newCompany).success(function(data){
			$('.closeModal').click();
			MainService.companies().success(function(data,status){
				$scope.companies=data;
			})
		}).error(function(err,status){
			if(status==400){
				$scope.nameError=true;
			}
		});
	}
}]);