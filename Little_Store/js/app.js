(function() {

angular
    .module('storeApp', ['ngRoute', 'ui.bootstrap', 'ngStorage'])
    .config(function($routeProvider) {
        $routeProvider

        // route for the home page
            .when('/', {
                templateUrl : 'views/home.html',
                controller  : 'StoreController'
            })

            .when('/about', {
                templateUrl : 'views/about.html',
                controller  : 'StoreController'
            })

            .when('/basket', {
                templateUrl : 'views/basket.html',
                controller  : 'StoreController'
            });
    });
})();