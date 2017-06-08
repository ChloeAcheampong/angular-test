(function () {
  'use strict';

  angular.module('ServicesFactoryExample', [])
  .controller('List1Controller',List1Controller )
  .provider('ShoppingService',ShoppingServiceProvider)
  .config(Config);

Config.$inject=['ShoppingServiceProvider'];
function Config(ShoppingServiceProvider) {
  ShoppingServiceProvider.defaults.maxItems = 5;
}

List1Controller.$inject= ['ShoppingService'];
function List1Controller(ShoppingService) {

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



function ShoppingCartService(maxItems) {
    var service =this;
    var shoppingList =[];

    service.addItem = function (itemName, itemQuantity) {
      if ((maxItems === undefined)  || (maxItems !== undefined && shoppingList.length < maxItems)){
        var item = {};
        item.itemName = itemName;
        item.itemQuantity =itemQuantity;
        shoppingList.push(item);
      }else {
        throw new Error(`Max limit of items ${maxItems}reached`);
      }
    }

    service.removeItem = function (index) {
        shoppingList.splice(index,1);
    }

    service.getItems= function () {
      return shoppingList;
    }
}


function ShoppingServiceProvider() {
  var provider = this;
  provider.config ={};
  provider.defaults = {
    maxItems: 10
  };

  provider.$get= function () {
    return new ShoppingCartService(provider.defaults.maxItems);

  }
}

})();
