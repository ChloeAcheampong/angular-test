(function () {
  'use strict';

  angular.module('CustomDirectivesExample', [])
  .controller('List1Controller',List1Controller )
  .controller('List2Controller',List2Controller)
  .factory('ShoppingServiceFactory',ShoppingServiceFactory)
  .directive('shoppingList', ShoppingList);


  function ShoppingList() {
    /**isolation of scope implemented hence any controller object in html can be passed
    to it and the directive will have the same effect.*/
    var ddo={
      scope:{
        list: '=myList',
        title:'@title'
      },
      templateUrl:'shoppingList.html'
    }
    return ddo;

  }
  //No isolation of scope - not parameterized
  // .directive('listItemDetails', listItemDetails)
  // .directive('listItem', listItem);
  // function listItem() {
  //   var ddo= {
  //     restrict :'E', // use AE -Attribute/Element to put restrictions on how a template can be used.
  //     templateUrl: 'listItem.html'
  //   }
  //   return ddo;
  // }
  // function listItemDetails() {
  //   var ddo={
  //     template: '{{item.itemQuantity}} of {{item.itemName}}'
  //   }
  //   return ddo;
  // }

  List1Controller.$inject= ['ShoppingServiceFactory'];
  function List1Controller(ShoppingServiceFactory) {
   var list1 = this;
   var shoppingListService = ShoppingServiceFactory(); //no limit
   list1.itemName = "";
   list1.itemQuantity ="";


   list1.items = shoppingListService.getItems();
   list1.title = "Shopping Cart #1 ( " + list1.items.length+" items)";
   list1.addItem= function () {
     try {
        shoppingListService.addItem(list1.itemName, list1.itemQuantity);
        list1.title = "Shopping Cart #1 ( " + list1.items.length+" items)";
     } catch (e) {
       list1.errorMessage = e.message;
     }
   }
   list1.removeItem=function (index) {
      shoppingListService.removeItem(index);
      list1.title = "Shopping Cart #1 ( " + list1.items.length+" items)";
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
