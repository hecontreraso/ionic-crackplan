angular.module('ProfileController', [])

.controller('ProfileCtrl', function($scope, $http, $timeout, $stateParams, ProfileService) {

	console.log("user ID: " + $stateParams.userId);
	
	ProfileService.getProfileData($stateParams.userId).then(function(data){
		$scope.user_info = formatUserData(data.profile_data);
		$scope.events = formatEvents(data.events);
	});

	function formatUserData(user){
		if(user.image === null){
			user.image = '../img/profile_missing.png';
		}

		$scope.is_same_profile = ($scope.currentUser.id == $stateParams.userId) ? true : false;

		return user;
	}

	function formatEvents(events){
		events.forEach(function(event){
			if(event.image === null){
				event.image = '../img/event_missing.jpg';
			}

			event.going_or_join_label = event.user_is_going ? 'Going' : 'Join';

			var total_assistants = event.assistants.length;
	    event.all_but_last_two_assistants = event.assistants.slice(0, total_assistants - 2);
	    event.last_two_assistants = event.assistants.slice(total_assistants - 2);

	    event.showed_assistants = event.assistants.slice(0, $scope.limit_assistants_shown);
	    event.hidden_assistants_qty = event.assistants.length - $scope.limit_assistants_shown;
	    // event.hidden_assistants = event.assistants.slice(limit_assistants_shown, total_assistants - $scope.limit_assistants_shown);
		});
		return events;
	}
});