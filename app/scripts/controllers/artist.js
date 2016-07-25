'use strict';

/**
 * @ngdoc function
 * @name ngSpotifyApp.controller:ArtistCtrl
 * @description
 * # ArtistCtrl
 * Controller of the ngSpotifyApp
 */
angular.module('discoverItApp')
  .controller('ArtistCtrl', function ($scope, artistData, artistTopTracks, relatedArtists, ngAudio, $window, $timeout) {

    $scope.artist = artistData;
    $scope.topTracks = artistTopTracks.tracks;
    $scope.relatedArtists = relatedArtists.artists;
    $scope.goToSpotify = goToSpotify;
    $scope.togglePreview = togglePreview;
    $scope.skipPreview = skipPreview;
    $scope.currentTrackName = $scope.topTracks[0].name;
    $scope.currentAlbum = $scope.topTracks[0].album.name;
    $scope.startProgress = startProgress;
    $scope.songProgress = 0;

    var currentTrack;
    var bTrackPlaying = false;

    function goToSpotify() {
      $window.open($scope.artist.external_urls.spotify, '_blank');
    }

    function togglePreview(track) {
      if(bTrackPlaying && $scope.currentTrackName === track.name) {
        currentTrack.stop();
        $scope.songProgress = 0;
        bTrackPlaying = false;
        return currentTrack = ngAudio.load(track.preview_url);
      }
      else if(bTrackPlaying && $scope.currentTrackName !== track.name) {
        currentTrack.stop();
        $scope.songProgress = 0;
      }
      $scope.currentTrackName = track.name;
      $scope.currentAlbum = track.album.name;
      currentTrack = ngAudio.load(track.preview_url);
      currentTrack.play();
      bTrackPlaying = true;
      startProgress();
    }

    function startProgress() {
      if($scope.songProgress === 100) {
        $scope.songProgress = 0;
        return;
      } else {
        $scope.songProgress = currentTrack.progress * 100;
        $timeout(startProgress, 100);
      }
    }

    function skipPreview() {
      currentTrack.stop();
      currentTrack.play();
    }

    $scope.$on('$destroy', function() {
      if(bTrackPlaying) {
        currentTrack.stop();
      }
    });

  });