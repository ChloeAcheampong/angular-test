(function () {
  'use strict';

  angular.module('MenuApp', [])
  .controller('MenuAppController',MenuAppController )
  .service('MenuAppService',MenuAppService)
  .constant('AbsolutePath' ,'http://davids-restaurant.herokuapp.com');


MenuAppController.$inject= ['MenuAppService'];
function MenuAppController(MenuAppService) {
    var menu = this;
    var promise  = MenuAppService.getCategories();
    promise
    .then(function (response) {
      menu.categories=response.data;
    })
    .catch(function (err) {
      console.error('Something went terribly wrong');
    })

    menu.menuItems = function (name) {
      let promise = MenuAppService.logMenuItemsForCategory(name);
      promise.then(function (response) {
        // menu.categories=response.data;
        console.log(response.data);
      }).catch(function (err) {
        console.error('Something went terribly wrong Menu items for cat');
      })
    }


}

MenuAppService.$inject= ['$http','AbsolutePath'];
function MenuAppService($http,AbsolutePath) {
    var service =this;

    service.getCategories= function () {
      var response = $http({
        method:'GET',
        url:(AbsolutePath+'/categories.json')
      });

      return response;
    }

    service.logMenuItemsForCategory=function (short_name) {
      var response = $http({
        method:'GET',
        url:(AbsolutePath+'/menu_items.json'),
        params: {
          category: short_name
        }
      });

      return response;
    }
}



})();
