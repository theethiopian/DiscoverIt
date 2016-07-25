'use strict';

/**
 * @ngdoc directive
 * @name ngSpotifyApp.directive:spNavbar
 * @description
 * # spNavbar
 */
angular.module('discoverItApp')
  .directive('spNavbar', function () {
    return {
      templateUrl: './views/navbar.html',
      restrict: 'E',
      controller: 'NavbarCtrl'
    };
  });