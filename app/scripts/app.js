'use strict';

/**
 * @ngdoc overview
 * @name discoverItApp
 * @description
 * # discoverItApp
 *
 * Main module of the application.
 */
angular.module('discoverItApp', [
     'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'firebase.auth', 
    'ngMaterial', 
    'ui.router',
    'spotify',
    'ngAudio'
  ])

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
    
    $compileProvider.debugInfoEnabled(false);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.$waitForAuth();
          }
        }
      })
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.$requireAuth();
          }
        }
      })
       .state('chat', {
        url: '/chat',
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.$waitForAuth();
          }
        }
      })
      .state('artist', {
        url: '/artist/:idArtist',
        templateUrl: 'views/artist.html',
        controller: 'ArtistCtrl',
        resolve: {
          artistData: function(Spotify, $stateParams) {
            return Spotify.getArtist($stateParams.idArtist);
          },
          artistTopTracks: function(Spotify, $stateParams) {
            return Spotify.getArtistTopTracks($stateParams.idArtist, 'US');
          },
          relatedArtists: function(Spotify, $stateParams) {
            return Spotify.getRelatedArtists($stateParams.idArtist);
          },
          currentAuth: function(Auth) {
            return Auth.$requireAuth();
          }
        }
      });

      $urlRouterProvider
        .otherwise('/home');
  })

.run(function($rootScope, $state, $mdDialog, $mdToast, $timeout) {

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if(error === 'AUTH_REQUIRED') {
        $state.go('login');
        return $timeout(function() {
          $mdToast.show(
            $mdToast
            .simple()
            .content('You must be logged in to view content.')
            .position('bottom right')
          );
        }, 300);
      }
    });

  });