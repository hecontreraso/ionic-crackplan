angular.module('EditProfileController', [])

.controller('EditProfileCtrl', function($scope, $state, $ionicPopup, $http, AuthService, SERVER_URL, UserService) {

  $scope.$on('$ionicView.enter', function(e) {
    $scope.user = UserService.getlocalUserData();
  });

  $scope.saveProfile = function() {
    UserService.updateProfile($scope.user).then(function(){
        var alertPopup = $ionicPopup.alert({
          title: 'Success!',
          template: 'Profile updated succesfully!'
        });
      }, 
      function(err) {
        var alertPopup = $ionicPopup.alert({
          title: 'Update profile failed!',
          template: err
        });
      });
  };
});
