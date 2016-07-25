'use strict';

/**
 * @ngdoc function
 * @name ngSpotifyApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the ngSpotifyApp
 */
angular.module('discoverItApp')
  .controller('NavbarCtrl', function ($scope, Auth, $state) {

    $scope.isLoggedIn = isLoggedIn;
    $scope.logOutUser = logOutUser;

    function logOutUser() {
      Auth.$unauth();
      return $state.go('login');
    }

    function isLoggedIn() {
      return Auth.$getAuth();
    }
    
  });