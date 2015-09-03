angular.module('EventService', [])

.factory('EventService', function($http, SERVER_URL, $ionicPopup){
	var events = [];
	
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
      console.log(event);
			return $http.post(SERVER_URL + '/events', 
	      {
	        details: event.details,
	        date: event.date,
	        time: event.time,
	        where: event.where,
	        image: event.image
	      }
	    )
	    .success(function(){
	      var alertPopup = $ionicPopup.alert({
	        title: 'Success!',
	        template: 'Event created succesfully!'
	      });
	    })
	    .error(function(data){
	      console.log("Error making the request");
	      console.log(event);
	    });
		}
	}
});