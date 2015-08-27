angular.module('LoginController', [])

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};
 
  $scope.login = function(data) {
    AuthService.login(data.email, data.password).then(function(authenticated) {
      $state.go('tab.dash', {}, {reload: true});
      $scope.setCurrentUser(AuthService.user());
      // $scope.data = {};
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

  $scope.logout = function(){
    AuthService.logout();
    $state.go('login', {}, {reload: true});
  };
});
