angular.module('EditProfileController', [])

.controller('EditProfileCtrl', function($scope, $state, $ionicPopup, $http, AuthService, SERVER_URL) {

  $scope.saveProfile = function(user) {
  	console.log(user);
    $http.patch(SERVER_URL + '/edit_profile', 
      {
        email: user.email,
        name: user.fullName,
        birthdate: user.birthdate,
        gender: user.gender,
        bio: user.bio
      }
    )
    .success(function(){
			// Actualizar objeto user en app controller

      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: 'Profile updated succesfully!'
      });
    })
    .error(function(data){
      console.log("Error making the request");
      console.log(user);
    });
  };
});
