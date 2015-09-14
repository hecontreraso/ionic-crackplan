angular.module('EventService', [])

.factory('EventService', function($http, SERVER_URL, $ionicPopup, $cordovaFileTransfer){
	var events = [];
	
 	function addEventPic(imageLocalURL){
 		console.log('addEventPic');
 		console.log(imageLocalURL);
		var options = {
	    fileKey: "image",
	    chunkedMode: false,
	    httpMethod: 'POST',
	    mimeType: "image/jpg",
	    headers: { Authorization: $http.defaults.headers.common.Authorization }
		};
		return $cordovaFileTransfer.upload(SERVER_URL + '/addEventPic', imageLocalURL, options, true)
		.then(function(response) {
	 		console.log('$cordovaFileTransfer');
	 		console.log(response);
			return response;
    },function(err) {
	 		console.log('ERR');
	 		console.log(err);
    });
	}

	return {
		GetFeed: function(event_index){
			return $http.get(SERVER_URL + '/events/' + event_index)
			.then(function(response){
				return response.data;
			});
		},
		toggleAssistance: function(event){
			return $http.post(SERVER_URL + '/events/' + event.id + '/toggle_assistance/')
			.then(function(response){
				return response.data.user_is_going;
			});
		},
		createEvent: function(event){
			return $http.post(SERVER_URL + '/events', 
	      {
	        details: event.details,
	        date: event.date,
	        time: event.time,
	        where: event.where
	      }
	    )
	    .success(function(response){
				addEventPic(event.image);
	    	return response.data;
	    });
		}
	}
});