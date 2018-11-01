angular.module('EventGo').value('nwToastr', toastr);

angular.module('EventGo').factory('nwNotifier', function(nwToastr) {
  return {
    notify: function(msg) {
      nwToastr.success(msg);
      console.log(msg);
    },
    error: function(msg) {
      nwToastr.error(msg);
      console.log(msg);
    }
  }
});