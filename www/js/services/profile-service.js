angular.module('ProfileService', [])

.factory('ProfileService', function($http, SERVER_URL, $ionicPopup, $cordovaFileTransfer){
	return {
		getProfileData: function(profile_id){
			return $http.get(SERVER_URL + '/profile/' + profile_id)
			.then(function(response){
				return response.data;
			});
		},
		toggleFollow: function(profile_id){
			return $http.post(SERVER_URL + '/profile/' + profile_id + '/toggle_follow')
			.then(function(response){
				return response.data;
			});
		},
		addProfilePic: function(imageLocalURL){
			var options = {
		    fileKey: "image",
		    chunkedMode: false,
		    httpMethod: 'POST',
		    mimeType: "image/jpg",
		    headers: { Authorization: $http.defaults.headers.common.Authorization }
			};
			console.log("cordovafiletransfer");
			console.log($cordovaFileTransfer);
			console.log('imageLocalURL:');
			console.log(imageLocalURL);
			return $cordovaFileTransfer.upload(SERVER_URL + '/addProfilePic', imageLocalURL, options, true)
			.then(function(response) {
				console.log("cordovafiletransfer response:");
				console.log(response);
				return response;
      });
		},
		removeProfilePic: function(){
			return $http.post(SERVER_URL + '/removeProfilePic')
			.then(function(response){
				return response.data;
			});
		}
	}
});
