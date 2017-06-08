(function () {
  'use strict';
  var shoppingList =["Milk", "Yoghurt", "Mouse", "Keyboard"]

  angular.module('Inheritance', [])
  .controller('ParentController',ParentController )
  .controller('ChildController',ChildController );

  ParentController.$inject =['$scope']
  function ParentController($scope){
    this.search = "new";
    $scope.value=2;

  }

  // ChildController.$inject =['$scope']
  function ChildController(){
    this.shoppingList = shoppingList;
    this.search = "mi";
  }


})();
