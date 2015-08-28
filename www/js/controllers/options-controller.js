angular.module('OptionsController', [])

.controller('OptionsCtrl', function($scope, $state, $http, $ionicPopup, AuthService, SERVER_URL) {
  $scope.changePrivacy = function() {

    $http.post(SERVER_URL + '/change_privacy', 
      { is_private: $scope.currentUser.is_private }
    )
    .success(function(){})
    .error(function(data){
      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: 'Error changing the privacy!'
      });
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
});