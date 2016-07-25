'use strict';

/**
 * @ngdoc function
 * @name ngSpotifyApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ngSpotifyApp
 */
angular.module('discoverItApp')
  .controller('HomeCtrl', function ($scope, Spotify) {
    
    $scope.searchStr = '';
    $scope.artistResults = [];
    $scope.searchArtist = searchArtist;

    function searchArtist() {
      if($scope.searchStr.length) {
        Spotify.search($scope.searchStr, 'artist')
          .then(function(response) {
            $scope.artistResults = response.artists.items;
          });
      $scope.currentArtist = null;
      }
    }

  });
