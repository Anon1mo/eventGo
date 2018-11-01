angular.module('EventGo').controller('UsersShowController', function(User, Message, $scope, $routeParams, Identity){
  $scope.user = User.get({id: $routeParams.id}, function(user) {
    $scope.isSelf = user._id === Identity.currentUser._id;
  });

  $scope.message = new Message();
  $scope.wantMessage = function() {
    $scope.writing = true;
  };

  $scope.send = function() {
    $scope.message.user1 = Identity.currentUser._id;
    $scope.message.user2 = $scope.user._id;
    $scope.message.sender = Identity.currentUser.username;

    $scope.message.$save().then(function(response) {
      $scope.writing = false;
      $scope.message.msg = '';
    });

  }
});