angular.module('EventsController', [])

.controller('EventsCtrl', function($scope, $http, $timeout, EventService) {
	$scope.events = [];
	$scope.moreDataCanBeLoaded = true;
	$scope.limit_assistants_shown = 5;
	var event_index = 0;

	$scope.loadMore = function() {
		EventService.GetFeed(event_index).then(function(events){
			if (events.length < 2) {
        $scope.moreDataCanBeLoaded = false;
      }

      events = formatEvents(events);
			console.log(events[0]);

			$scope.events = $scope.events.concat(events);
			event_index += events.length;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	}

	$scope.toggleAssistance = function(event){
		EventService.toggleAssistance(event).then(function(user_is_going){
			event.user_is_going = user_is_going;
			event.going_or_join_label = event.user_is_going ? 'Going' : 'Join';
		});
	}

	function formatEvents(events){
		events.forEach(function(event){
			if(event.feed_creator.image === null){
				event.feed_creator.image = '../img/profile_missing.png';
			}
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