app.controller('CompanyCtrl', ['$scope','$location','MainService','$stateParams','socket', function($scope,$location,MainService,$stateParams,socket){
	socket.on('comment',function(data){
		console.log('a');
		$scope.company[2]=data;
	})
	MainService.authorized().
		success(function(){
			getCompany();
		})
		.error(function(){
			$location.url('/login');
		});
	function getCompany(){
			MainService.user().success(function(data,status){
				if(status===200){
					if(data.role==="admin" || data.role==="moderator"){
						$scope.canEdit=true;
					} 
				}
			});
			MainService.company($stateParams.id).success(function(data,status){

				$scope.company=data;
				$scope.company[0].entry_date=new Date($scope.company[0].entry_date).toLocaleDateString();
				$scope.company[1]=$scope.company[1].map(function(item){
					item.entry_date=new Date(item.entry_date).toLocaleDateString();
					return item;
				})
				$scope.company[2]=$scope.company[2].map(function(item){
					
					item.add_date=new Date(item.add_date).toLocaleDateString();
					return item;
				})
				$scope.company[3]=$scope.company[3].map(function(item){
					var cities=[];
					$scope.company[4].map(function(city){
						if(city.storehouse_id==item.storehouse_id){
							var obj={
								city_name:city.city_name,
								city_building_date:new Date(city.building_date).toLocaleDateString(),
							}
							cities.push(obj);
						}
					})
					item.cities=cities;
					return item;
				})
				$scope.cities=data[5];
				$scope.visible=true;
			})
	}
	$scope.deleteComment=function(id){
		MainService.deleteComment(id).success(function(){
			if($scope.company[2]){
				$scope.company[2]=$scope.company[2].filter(function(item){
					return (item.message_id===id) ? false : true;
				})
			}
		})
	}
	$scope.addComment=function(){
		if(!this.commentString){
			return;
		}
		var postData={
			"commentString":this.commentString,
			"companyId":$scope.company[0].company_id
		}
		console.log(postData);
		MainService.addComment(postData).success(function(data){
			$scope.company[2]=data;
			$scope.company[2]=$scope.company[2].map(function(item){
					item.add_date=new Date(item.add_date).toLocaleDateString();
					return item;
				})
			socket.emit('comment',data);
		}).error(function(){

		})
	}
	$scope.addNewEmployee=function(){
		console.log(this.newEmployee);
		MainService.addEmployee({"employee":this.newEmployee,"company_id":$scope.company[0].company_id}).success(function(data){
			$('.closeModal').click();
			if($scope.company[1]){
				$scope.company[1].push(data);
				$scope.company[1].sort(function(a,b){
					return a.name>b.name ? 1 : -1;
				});
			}
		}).error(function(err,status){
			if(status==400){
				$scope.nameError=true;
			}
		});
	}
	$scope.deleteEmployee=function(id){
		MainService.deleteEmployee(id).success(function(){
			if($scope.company[1]){
				$scope.company[1]=$scope.company[1].filter(function(item){
					return (item.employee_id==id) ? false : true;
				})
			}
		}).error(function(data,status){
			if(status==500){
				alert('Error while deleting company');
			}
		})
	}
	$scope.addStorehouse=function(){
		MainService.addStorehouse({"storehouse":this.newStorehouse,"company_id":$scope.company[0].company_id}).success(function(data){
			$('.closeModal').click();
			$scope.company[3]=data[0];
			$scope.company[4]=data[1];
			$scope.company[3]=$scope.company[3].map(function(item){
					var cities=[];
					$scope.company[4].map(function(city){
						if(city.storehouse_id==item.storehouse_id){
							var obj={
								city_name:city.city_name,
								city_building_date:new Date(city.building_date).toLocaleDateString(),
							}
							cities.push(obj);
						}
					})
					item.cities=cities;
					return item;
				})
			console.log($scope);
		}).error(function(err,status){
			if(status==400){
				$scope.nameError=true;
			}
		});
	}
	$scope.deleteStorehouse=function(id){
		MainService.deleteStorehouse(id).success(function(){
			if($scope.company[3]){
				$scope.company[3]=$scope.company[3].filter(function(item){
					return (item.storehouse_id==id) ? false : true;
				})
			}
		}).error(function(data,status){
			if(status==500){
				alert('Error while deleting company');
			}
		})
	}
}]);