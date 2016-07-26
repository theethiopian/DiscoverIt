'use strict';
/**
 * @ngdoc function
 * @name discoverItApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('discoverItApp')
  .controller('ChatCtrl', function ($scope, Ref, Array, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    var Array = [];
    $scope.messages = Array(Ref.child('messages').limitToLast(10));

    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
