(function () {
  'use strict';
  var shoppingList =["Milk", "Yoghurt", "Mouse", "Keyboard"]

  angular.module('FilterArray', [])
  .controller('FilterArrayController',FilterArrayController );

  FilterArrayController.$inject =['$scope']
  function FilterArrayController($scope){
    $scope.shoppingList = shoppingList;

  }




})();
