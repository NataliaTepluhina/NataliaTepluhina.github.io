(function() {

    angular
        .module('storeApp')
        .controller('NavController', NavController);

    NavController.$inject = ["$scope"];

    function NavController($scope) {
        $scope.isCollapsed = true;
    }
})();
