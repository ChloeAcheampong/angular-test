(function () {
  'use strict';

  angular.module('PromiseExample', [])
  .controller('PromiseController',PromiseController )
  .service('ShoppingService',ShoppingCartService)
  .service('WeightLossService',WeightLossService);


PromiseController.$inject= ['ShoppingService'];
function PromiseController(ShoppingService) {
   var list1 = this;
   list1.itemName = "";
   list1.itemQuantity ="";

   list1.items = ShoppingService.getItems();

   list1.addItem= function () {
     try {
        ShoppingService.addItem(list1.itemName, list1.itemQuantity);
     } catch (e) {
       list1.errorMessage = e.message;
     }
   }
   list1.removeItem=function (index) {
      ShoppingService.removeItem(index);
    }


}
ShoppingCartService.$inject= ['$q','WeightLossService'];
function ShoppingCartService($q, WeightLossService) {
    var service =this;
    var shoppingList =[];


    service.addItem = function (itemName, itemQuantity) {
        var namePromise  = WeightLossService.checkName(itemName);
        var quantityPromise = WeightLossService.checkQuantity(itemQuantity);
        $q.all([namePromise, quantityPromise])
        .then(function (res) {
            var item = {};
            item.itemName = itemName;
            item.itemQuantity =itemQuantity;
            shoppingList.push(item);
        })
        .catch(function (error) {
          console.error(error.message);
        });
    }

    service.removeItem = function (index) {
        shoppingList.splice(index,1);
    }

    service.getItems= function () {
      return shoppingList;
    }
}

WeightLossService.$inject= ['$q'];
function WeightLossService($q) {
  var service =this;
  var result ={ message:""}

  service.checkName = function (name){
    var deferred = $q.defer();
    if (name.toLowerCase().indexOf('cookies') === -1) {
      deferred.resolve(result);
    }
    else {
      result.message ="Stay away from cookies Chloe!";
      deferred.reject(result);
    }
    return deferred.promise;

  }

  service.checkQuantity = function (quantity){
    var deferred = $q.defer();
    if (quantity < 6) {
      deferred.resolve(result);
    }
    else {
      result.message ="Too much Chloe!";
      deferred.reject(result);
    }
    return deferred.promise;
  }


}


})();
