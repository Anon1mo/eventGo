angular.module('EventGo').controller('UsersProfileController', function($scope, Auth, Identity, nwNotifier, $cookieStore) {

  $scope.user = {};
  $scope.user.username = Identity.currentUser.username;
  $scope.user.name = Identity.currentUser.name;
  $scope.user.age = Identity.currentUser.age;
  $scope.user.location = Identity.currentUser.location;
  $scope.user.tel = Identity.currentUser.tel;
  $scope.user.car = Identity.currentUser.car;
  $scope.user.bio = Identity.currentUser.bio;

  $scope.update = function() {
    var updateUser = {
      username: $scope.user.username,
      name: $scope.user.name,
      age: $scope.user.age,
      location: $scope.user.location,
      tel: $scope.user.tel,
      car: $scope.user.car,
      bio: $scope.user.bio
    };
    if($scope.password && $scope.password.length > 0 ) {
      updateUser.password = $scope.password;
    }

    Auth.updateCurrentUser(updateUser).then(function() {
      $cookieStore.put('User', Identity.currentUser);
      nwNotifier.notify('Your account has been updated!');
    }, function(err) {
      nwNotifier.error(err);
    });

  }
});