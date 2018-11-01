angular.module('EventGo').controller('LoginController', function($scope, $http, $location, $route, $cookieStore, $rootScope, Identity, Auth, nwNotifier) {

  $scope.identity = Identity;

  $scope.signin = function(username, password) {
    Auth.authenticateUser(username, password).then(function(success) {
      if(success) {
        $cookieStore.put('User', Identity.currentUser);
        nwNotifier.notify('Success! You have signed in!');
        $route.reload();
      } else {
        nwNotifier.notify('Username or password is incorrect');
      }
    });
  };

  $scope.signout = function() {
    Auth.logoutUser().then(function() {
      $cookieStore.remove('User');
      $scope.username = "";
      $scope.password = "";
      nwNotifier.notify('Success! You have logged out!');
      $location.path('/');
    })
  }
});