app.factory('MainService', ['$http', function($http){
	return {
		user:function(){
			return $http.get('/userById');
		},
    storehouse:function(id){
      return $http.get('/storehouse/'+id);
    },
    getItems:function(){
      return $http.get('/getItems');
    },
    editProduct:function(data){
      return $http.post('/editProduct',data);
    },
    addStorehouse:function(data){
      return $http.post('/addStorehouse',data);
    },
    addComment:function(data){
      return $http.post('/addComment',data);
    },
    addProduct:function(data){
      return $http.post('/addProduct',data);
    },
    addCountry:function(data){
      return $http.get('/addCountry/'+data);
    },
    addProvider:function(data){
      return $http.get('/addProvider/'+data);
    },
    addConsist:function(data){
      return $http.get('/addConsist/'+data);
    },
    deleteCountry:function(id){
      return $http.get('/deleteCountry/'+id);
    },
    deleteProvider:function(id){
      return $http.get('/deleteProvider/'+id);
    },
    deleteConsist:function(id){
      return $http.get('/deleteConsist/'+id);
    },
    product:function(id){
      return $http.get('/product/'+id);
    },
    addGroup:function(data){
      return $http.post('/addGroup',data);
    },
    deleteComment:function(id){
      return $http.get('/deleteComment/'+id); 
    },
    deleteGroup:function(id){
      return $http.get('/deleteGroup/'+id);
    },
    deleteProduct:function(id){
      return $http.get('/deleteProduct/'+id);
    },
    deleteEmployee:function(id){
      return $http.get('/deleteEmployee/'+id);
    },
    deleteStorehouse:function(id){
      return $http.get('/deleteStorehouse/'+id);
    },
    deleteCompany:function(id){
      return $http.get('/deleteCompany/'+id);
    },
    companies:function(){
      return $http.get('/companies');
    },
    company:function(id){
      return $http.get('/company/'+id);
    },
    addCompany:function(data){
      return $http.post('/addCompany',data);
    },
    addEmployee:function(data){
      return $http.post('/addEmployee',data);
    },
		login: function (user) {
			return $http.post('/login',user);
		},
		registration: function (user) {
			return $http.post('/registration',user);
		},
		authorized:function(){
			return $http.get('/authorized');
		},
    changeUsername:function(data){
      return $http.post('/changeUsername',data);
    },
    changePassword:function(data){
      return $http.post('/changePassword',data);
    },
		checkUsernames:function(user){
			return $http.post('/checkUsernames',user);
		}
	}
}])

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});