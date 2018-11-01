angular.module('EventGo').controller('MessagesIndexController', function(Message, $scope, $route, $routeParams, Identity){

  $scope.identity = Identity;
  $scope.writing = false;
  $scope.newMessage = new Message();
  Message.userAll({id: $routeParams.id1}, function(data) {
    $scope.messages = data;
    for(var i = 0, l = $scope.messages.length; i < l; i++) {
      $scope.messages[i].see = false;
    }
  });

  $scope.send = function() {

    $scope.newMessage.user1 = Identity.currentUser._id;
    $scope.newMessage.user2 = $scope.receiver.user2._id;
    $scope.newMessage.sender = Identity.currentUser.username;

    $scope.newMessage.$save().then(function(response) {
      $scope.writing = false;
      $scope.newMessage.msg = '';
      $route.reload();
    });
  };

  $scope.seeMessage = function(index) {
    $scope.messages[index].see = !$scope.messages[index].see;
    $scope.writing = !$scope.writing;
    if($scope.receiver === undefined) {
      $scope.receiver = $scope.messages[index];
    } else {
      $scope.receiver = undefined;
    }
  };

});