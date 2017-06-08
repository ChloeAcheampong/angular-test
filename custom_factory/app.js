(function () {
  'use strict';

  angular.module('ServicesFactoryExample', [])
  .controller('List1Controller',List1Controller )
  .controller('List2Controller',List2Controller)
  .factory('ShoppingServiceFactory',ShoppingServiceFactory);

List1Controller.$inject= ['ShoppingServiceFactory'];
function List1Controller(ShoppingServiceFactory) {
 var list1 = this;
 var shoppingListService = ShoppingServiceFactory(); //no limit
 list1.itemName = "";
 list1.itemQuantity ="";

 list1.items = shoppingListService.getItems();

 list1.addItem= function () {
   try {
      shoppingListService.addItem(list1.itemName, list1.itemQuantity);
   } catch (e) {
     list1.errorMessage = e.message;
   }
 }
 list1.removeItem=function (index) {
    shoppingListService.removeItem(index);
  }


}

List2Controller.$inject= ['ShoppingServiceFactory'];
function List2Controller(ShoppingServiceFactory) {
  var list2 = this;
  var shoppingListService = ShoppingServiceFactory(3); //set limit
  list2.itemName = "";
  list2.itemQuantity ="";
  list2.items = shoppingListService.getItems();
  list2.addItem= function () {
    try {
       shoppingListService.addItem(list2.itemName, list2.itemQuantity);
    } catch (e) {
      list2.errorMessage = e.message;
    }
  }

  list2.removeItem=function (index) {
     shoppingListService.removeItem(index);
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
        throw new Error(`Max limit of items(3) reached`);
      }
    }

    service.removeItem = function (index) {
        shoppingList.splice(index,1);
    }

    service.getItems= function () {
      return shoppingList;
    }
}


function ShoppingServiceFactory() {
  var factory = function (maxItems) {
      return new ShoppingCartService(maxItems);
  }
  return factory;
}

})();
