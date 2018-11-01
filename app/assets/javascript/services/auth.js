angular.module('EventGo').factory('Auth', function ($http, $q, $cookieStore, Identity, User) {
  return {
    authenticateUser: function (username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username: username, password: password}).then(function (response) {
        if (response.data.success) {
          var user = new User();
          angular.extend(user, response.data.user);
          Identity.currentUser = user;
          console.log(response.data.user);
          console.log('po logowaniu Identity');
          console.log(Identity.currentUser);
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    createUser: function(newUserData) {
      var newUser = new User(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function(savedUser) {
        //Identity.currentUser = newUser;
        console.log('user');
        console.log(savedUser);
        var user = new User();
        angular.extend(user, savedUser);
        Identity.currentUser = user;
        dfd.resolve();
      }, function(error) {
        dfd.reject(error.data.reason);
      });
      return dfd.promise;
    },
    updateCurrentUser: function(updateUser) {
      var dfd = $q.defer();
      var clone = angular.copy(Identity.currentUser);
      angular.extend(clone, updateUser);
      clone.$update().then(function() {
        Identity.currentUser = clone;
        dfd.resolve();
      }, function(err) {
        dfd.reject(err.data.reason);
      });
      return dfd.promise;
    },
    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        Identity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if(Identity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },
    authorizeAuthenticatedUserForRoute: function() {
      if(Identity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
});