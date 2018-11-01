angular.module('EventGo').controller('UsersSignupController', function($scope, User, $location, $cookieStore, Auth, Identity, nwNotifier) {

  $scope.user = {};
  $scope.signup = function() {
    var newUser = {
      username: $scope.user.username,
      password: $scope.user.password,
      email: $scope.user.email,
      name: $scope.user.name,
      age: $scope.user.age,
      location: $scope.user.location,
      tel: $scope.user.tel,
      car: $scope.user.car,
      bio: $scope.user.bio
    };

    Auth.createUser(newUser).then(function() {
      $cookieStore.put('User', Identity.currentUser);
      nwNotifier.notify('Account created');
      $location.path('/');
    }, function(err) {
      nwNotifier.error(err);
    });
  }

});