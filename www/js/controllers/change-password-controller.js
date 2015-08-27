angular.module('ChangePasswordController', [])

.controller('ChangePasswordCtrl', function($scope, $state, $http, $ionicPopup, AuthService, SERVER_URL) {

  $scope.$on("$ionicView.beforeEnter", function(event) {
    $scope.user = {
      oldPw: '',
      newPw: '',
      newPwConfirmation: ''
    };
  });

  $scope.changePassword = function(user){
    if(user.newPw  !== user.newPwConfirmation){
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: "The entered password doesn't match!"
      });
    }
    $http.post(SERVER_URL + '/change_password',
      { password: user.oldPw, new_password: user.newPw }
    )
    .success(function(){
      $scope.user = {
        oldPw: '',
        newPw: '',
        newPwConfirmation: ''
      };

      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: 'Password changed succesfully!'
      });
    })
    .error(function(data){
      console.log("Error making the request");
      console.log(data);
    });
  };
});