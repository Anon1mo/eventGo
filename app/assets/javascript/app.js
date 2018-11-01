angular.module('EventGo', ['ngRoute', 'ngResource', 'ngCookies', 'ngGravatar']).config(function(GravatarProvider){
  GravatarProvider.setSize(100);
});

angular.module('EventGo').run(function($rootScope, $location, $cookieStore) {
  $rootScope.user = $cookieStore.get('User');
  console.log('Rootscope user ');
  console.log($rootScope.user);

  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  });
});