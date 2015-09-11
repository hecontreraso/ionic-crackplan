angular.module('ProfileController', ['ProfileService'])

.controller('ProfileCtrl', function($http, $scope, $cordovaCamera, $cordovaImagePicker,
	$timeout, $ionicPopup, $stateParams, ProfileService, EventService) {

	console.log("user ID: " + $stateParams.userId);
	$scope.limit_assistants_shown = 5;
	$scope.is_private = false;
	var imageOptionsPopup = undefined;

  $scope.$on('$ionicView.enter', function(e) {
		ProfileService.getProfileData($stateParams.userId).then(function(data){
			$scope.user_info = formatUserData(data.profile_data);
			if(data.events === "private"){
				$scope.is_private = true;
			}
			else{
				$scope.events = formatEvents(data.events);
			}
			console.log($scope.user_info);
		});
  });

	function formatUserData(user){
		if(user.image === null){user.image = 'img/profile_missing.png';}
		$scope.is_same_profile = ($scope.currentUser.id == $stateParams.userId) ? true : false;
		if(user.status == "unfollowed") {user.status = "follow";}
		if(user.status) {user.status = user.status.charAt(0).toUpperCase() + user.status.slice(1);}

		return user;
	};

	function formatEvents(events){
		events.forEach(function(event){
			if(event.image === null) {event.image = 'img/event_missing.jpg';}
			
			event.going_or_join_label = event.user_is_going ? 'Going' : 'Join';

			var total_assistants = event.assistants.length;
	    event.all_but_last_two_assistants = event.assistants.slice(0, total_assistants - 2);
	    event.last_two_assistants = event.assistants.slice(total_assistants - 2);

	    event.showed_assistants = event.assistants.slice(0, $scope.limit_assistants_shown);
	    event.hidden_assistants_qty = event.assistants.length - $scope.limit_assistants_shown;
	    // event.hidden_assistants = event.assistants.slice(limit_assistants_shown, total_assistants - $scope.limit_assistants_shown);
		});
		return events;
	};

	$scope.toggleAssistance = function(event){
		EventService.toggleAssistance(event).then(function(user_is_going){
			event.user_is_going = user_is_going;
			event.going_or_join_label = event.user_is_going ? 'Going' : 'Join';
		});
	};

	$scope.toggleFollow = function(){
		ProfileService.toggleFollow($stateParams.userId).then(function(data){
			if(data.can_see_events == false) $scope.user_info.can_see_events = false;
			if(data.status == "unfollowed") data.status = "follow";
			data.status = data.status.charAt(0).toUpperCase() + data.status.slice(1);
			$scope.user_info.status = data.status;
		});
	};

  $scope.showImageOptions = function(){
    $scope.data = {}

    var template = "<div class='list'>";
    template += "<a class='item' ng-click='removeProfilePic()'><span>Remove current photo</span></a>";
    template += "<a class='item' ng-click='takePicture()'><span>Take photo</span></a>";
    template += "<a class='item' ng-click='choosePicture()'><span>Choose from library</span></a>";
    // template += "<a class='item'><span>Import from Facebook</span></a>";
    template += "</div>";

    imageOptionsPopup = $ionicPopup.show({
      template: template,
      title: 'SET A PROFILE PICTURE',
      scope: $scope
    });
    
    //close the popup after 3 seconds for some reason
    $timeout(function() { imageOptionsPopup.close(); }, 3000);
  };

  $scope.removeProfilePic = function(){
  	ProfileService.removeProfilePic().then(function(data){
	  	$scope.user_info.image = '/img/profile_missing.png';
	    imageOptionsPopup.close();
  	});
  };

	$scope.takePicture = function() {
		var options = {
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
			allowEdit : false,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
		};
		$cordovaCamera.getPicture(options).then(function(imageData) {
			addProfilePic(imageData);
		}, function(err) {
			console.log(err);
		});
	};

	$scope.choosePicture = function(){
		var options = {
	   	maximumImagesCount: 2,
	   	width: 600,
	   	height: 600,
	   	quality: 80
	  };
	  $cordovaImagePicker.getPictures(options)
	    .then(function (results) {
					addProfilePic(imageData);
	    }, function(error) {
      	var alertPopup = $ionicPopup.alert({
	        title: 'ERROR',
	        template: error
	      });
	    });
	};

	function addProfilePic(imageData){
		ProfileService.addProfilePic(imageData)
			.then(function(result) {
				$scope.user_info.image = imageData;
	      var alertPopup = $ionicPopup.alert({
	        title: 'EXITO',
	        template: 'Image uploaded succesfully!'
	      });
      }, function(err) {
	      var alertPopup = $ionicPopup.alert({
	        title: 'ERROR!',
	        template: JSON.stringify(err)
	      });
      });
	}
});