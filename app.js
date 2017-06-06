(function() {
  'use strict';

  angular.module('DIApp', [])
  .controller('DIController', DIController);
  DIController.$inject = ['$scope','$filter'];
  function DIController($scope, $filter) {
     $scope.stateOfBeing="happy";
    //  $scope.upper = function () {
    //    var upCase = $filter('uppercase');
    //    $scope.name = upCase($scope.name);
    //  }
     $scope.showStateOfBeing = function () {
       $scope.stateOfBeing = "sad";
     }

  }


})();
