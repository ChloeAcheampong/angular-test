(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.addToBuyList = function () {
    ShoppingListCheckOffService.addToBuyList(toBuyList.itemName, toBuyList.itemQuantity);
  }

  toBuyList.addBoughtItem = function (index) {
    ShoppingListCheckOffService.addBoughtItem(index);
  }

}

AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service=this;
  var toBuyShoppingList = [{ name: "cookies", quantity: 10 },{ name: "milk", quantity: 20 },
  { name: "chocolate", quantity: 5 },{ name: "drink", quantity: 20 }];
  var boughtshoppingList = [];

  service.addToBuyList=function (itemName, itemQuantity) {
    var item = {
      name: itemName,
      quantity: itemQuantity
    };
    toBuyShoppingList.push(item);
  }

  service.addBoughtItem=function (index) {
    var item = toBuyShoppingList.splice(index,1)[0];
    boughtshoppingList.push(item);
  }
  service.getToBuyItems=function () {
    return toBuyShoppingList;
  }
  service.getBoughtItems=function () {
    return boughtshoppingList;
  }

}



})();
