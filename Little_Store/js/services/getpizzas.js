(function () {
    angular
        .module('storeApp')
        .service('GetPizzas', GetPizzas);

    GetPizzas.$inject = ["$http", "$q"];

    function GetPizzas($http, $q) {
        var deffered = $q.defer();
        var data = [];

        GetPizzas.async = function() {
            $http.get('pizzas.json')
                .then (
                    function (response) {
                        data = response.data;
                        deffered.resolve();
                    },
                    function (error) {
                        console.log(error)
                    }
                );
            return deffered.promise;
        };
        GetPizzas.data = function() { return data; };

        return GetPizzas;
    }
})();
