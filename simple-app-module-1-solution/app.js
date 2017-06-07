(function () {
 'use strict';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject=['$scope'];
  function LunchCheckController($scope) {
    $scope.foodItems = "";
    $scope.message= "";
    $scope.messageStyle= {
      "margin-top": "50px",
      "text-align": "center",
      "font-size": "50px",
      "border-style": "hidden",
      "color": "red"
    };

    $scope.check = function () {
      var foodList = $scope.foodItems.split(",");
      foodList= foodList.filter(Boolean);
      if(foodList == ""){
        $scope.messageStyle.color ="red";
        $scope.messageStyle["border-style"] =  "solid";
        $scope.message= "Please enter data first!";

      }else if (foodList.length <= 3){
        $scope.messageStyle.color =  "green";
        $scope.messageStyle["border-style"] =  "solid";
        $scope.message= "Enjoy!";

      }else if (foodList.length >3) {
        $scope.messageStyle.color =  "green";
        $scope.messageStyle["border-style"] =  "solid";
        $scope.message= "Too much!";
      }
    }

  }

})();
// !function(){"use strict";function e(e){e.foodItems="",e.message="",e.messageStyle={"margin-top":"50px","text-align":"center","font-size":"50px","border-style":"hidden",color:"red"},e.check=function(){var s=e.foodItems.split(",");s=s.filter(Boolean),""==s?(e.messageStyle.color="red",e.messageStyle["border-style"]="solid",e.message="Please enter data first!"):s.length<=3?(e.messageStyle.color="green",e.messageStyle["border-style"]="solid",e.message="Enjoy!"):s.length>3&&(e.messageStyle.color="green",e.messageStyle["border-style"]="solid",e.message="Too much!")}}angular.module("LunchCheck",[]).controller("LunchCheckController",e),e.$inject=["$scope"]}();
