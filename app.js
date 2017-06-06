(function() {
  'use strict';

  angular.module('myFirstApp', [])

  .controller('MyFirstController', function ($scope) {
    $scope.name="Chloe";
    $scope.say=function () {
      return "Hellloo";
    }
  })

})();
