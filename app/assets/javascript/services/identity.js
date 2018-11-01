angular.module('EventGo').factory('Identity', function($rootScope, User) {
  var currentUser;
  if(!!$rootScope.user) {
    currentUser = new User();
    angular.extend(currentUser, $rootScope.user);
    //currentUser = $rootScope.user;
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
});