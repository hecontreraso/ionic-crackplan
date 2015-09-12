angular.module('ChangePasswordController', [])

.controller('ChangePasswordCtrl', function($scope, $state, $ionicPopup, UserService) {

  $scope.$on("$ionicView.enter", function(event) {
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

    console.log("calling service");
    console.log(user);

    UserService.changePassword(user.oldPw, user.newPw)
      .then(function(){
        $scope.user = {
          oldPw: '',
          newPw: '',
          newPwConfirmation: ''
        };

        var alertPopup = $ionicPopup.alert({
          title: 'Success!',
          template: 'Password changed succesfully!'
        });
      }, function(err){
        console.log("Error making the request");
        console.log(err);
      });
  };
});