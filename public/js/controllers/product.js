app.controller('ProductCtrl', ['$scope','$location','MainService','$stateParams','socket', function($scope,$location,MainService,$stateParams,socket){
	MainService.authorized().
		success(function(){
			getProduct();
		})
		.error(function(){
			$location.url('/login');
		});
	function getProduct(){
			MainService.user().success(function(data,status){
				if(status===200){
					if(data.role==="admin" || data.role==="moderator"){
						$scope.canEdit=true;
					} 
				}
			});		
			MainService.product($stateParams.id).success(function(data){
				$scope.product=data;
				$scope.visible=true;
			}).error(function(){
				$location.url('/login')
			})
	}
	$scope.edit=function(){
		this.newEditProduct.product_id=$stateParams.id;
		MainService.editProduct(this.newEditProduct).success(function(data){
			MainService.product($stateParams.id).success(function(data){
				$scope.product=data;
				$('.closeModalProd').click();
			})
		})
	}
	$scope.getProductInfo=function(){
		MainService.product($stateParams.id).success(function(data){
				$scope.newEditProduct=data;
				getItems();
				$scope.visible=true;
			});
	}
	function getItems(){
		$scope.editProduct={};
		MainService.getItems().success(function(data){
			$scope.editProduct.countries=data[0];
			$scope.editProduct.providers=data[1];
			$scope.editProduct.consist=data[2];
		})
	}
}]);