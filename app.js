(function() {
  'use strict';

  angular.module('DIApp', [])
  .controller('DIController', DIController)
  .filter('hates', hatesFilter)
  .filter('truth', TruthFilter);
  DIController.$inject = ['$scope','hatesFilter'];
  function DIController($scope, hatesFilter ) {
     $scope.stateOfBeing="happy";
     $scope.message="I love you!";
     $scope.showStateOfBeing = function () {
       $scope.stateOfBeing = "sad";
     }

     $scope.sayMessage = function () {
      return $scope.message;
    };

    $scope.sayHateMessage = function () {
    var msg = hatesFilter($scope.message)
     return msg;
   };


  }

  function hatesFilter() {
    return function (input) {
      input = input || "";
      input = input.replace("love","hate");
      return input;
    };
  }

  function TruthFilter(){
    return function (input, target, word) {
      input = input || "";
      input = input.replace(target,word);
      return input;
    }

  }


})();
