angular.module('EventGo').controller('UsersIndexController', function(User, $scope){
  $scope.users = User.query();
});