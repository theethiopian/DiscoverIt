angular.module('discoverItApp')
  .controller('ApplicationCtrl', function ($scope, $rootScope, $state, Auth) {
    
    $scope.logOutUser = function() {
      Auth.$unauth();
      return $state.go('login');
    };

  });