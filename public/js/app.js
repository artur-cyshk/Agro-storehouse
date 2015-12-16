var app = angular.module('media', [
	'ui.router','btford.socket-io'
]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/companies');
        $stateProvider
            .state('companies',{
                url:'/companies',
                templateUrl: 'templates/companies.html',
                controller: 'CompaniesCtrl'
            })
            .state('storehouse',{
                url:'/storehouse/:id',
                templateUrl: 'templates/storehouse.html',
                controller: 'StorehouseCtrl'
            })
            .state('company',{
                url:'/company/:id',
                templateUrl: 'templates/company.html',
                controller: 'CompanyCtrl'
            })
            .state('profile',{
                url:'/profile',
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            })
            .state('login',{
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('product',{
                url: '/product/:id',
                templateUrl: 'templates/product.html',
                controller: 'ProductCtrl'
            })
    }
])