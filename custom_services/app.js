(function () {
  'use strict';

  angular.module('ServicesExample', [])
  .controller('ShoppingCart',ShoppingCart )
  .controller('ShoppingCartDisplay',ShoppingCartDisplay)
  .service('ShoppingCartService',ShoppingCartService);

ShoppingCart.$inject= ['ShoppingCartService'];
function ShoppingCart(ShoppingCartService) {
 var item = this;
 item.itemName = "";
 item.itemQuantity ="";

 item.addItem= function () {
   ShoppingCartService.addItem(item.itemName, item.itemQuantity);
 }


}

ShoppingCartDisplay.$inject= ['ShoppingCartService'];
function ShoppingCartDisplay(ShoppingCartService) {
  var display =this;

  display.getItems=function () {
   return ShoppingCartService.getItems();
  }
  display.removeItem=function (index) {
     ShoppingCartService.removeItem(index);
  }

}


function ShoppingCartService() {
    var shoppingList =[];
    var service =this;

    service.addItem = function (itemName, itemQuantity) {
      var item = {};
      item.itemName = itemName;
      item.itemQuantity =itemQuantity;
      shoppingList.push(item);
    }

    service.removeItem = function (index) {
        shoppingList.splice(index,1);
    }

    service.getItems= function () {
      return shoppingList;
    }
}

})();
