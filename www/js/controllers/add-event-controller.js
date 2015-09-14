angular.module('AddEventController', ['EventService', 'ngMessages'])

.controller('AddEventCtrl', function(
  $scope, EventService, $ionicPlatform, $ionicActionSheet, $ionicPopup, $cordovaCamera, $timeout
){

  $scope.event = {}; 
  $scope.hours = [];
  $scope.minDate = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);

  for (var i = 5; i <= 23; i++){
    hour = i;
    time_of_day = 'AM';
    if(hour > 12){
      hour-=12;
      time_of_day = 'PM';
    }
    $scope.hours.push(
      hour + ':00 ' + time_of_day,
      hour + ':30 ' + time_of_day 
    );
  }

  $scope.createEvent = function(event){
    event.image = event.eventImage;
    console.log(event);
    EventService.createEvent(event).then(function(){
      $scope.event = {};
      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: 'Event created succesfully!'
      });
    }, function(err){
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: err
      });
    });
  }
   
  $scope.addImage = function() {
    var template = "<div class='list'>";
    template += "<a class='item' ng-click='takePicture()'><span>Take photo</span></a>";
    template += "<a class='item' ng-click='choosePicture()'><span>Choose from library</span></a>";
    template += "</div>";

    imageOptionsPopup = $ionicPopup.show({
      template: template,
      title: 'ADD A PICTURE FOR THE EVENT',
      scope: $scope
    });

    //close the popup after 3 seconds for some reason
    $timeout(function() { imageOptionsPopup.close(); }, 3000);
  }

  $scope.takePicture = function() {
    var options = {
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : false,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.event.eventImage = imageData;
    }, function(err) {
      console.log(err);
    });
  };

  $scope.choosePicture = function(){
    var options = {
      maximumImagesCount: 1,
      width: 600,
      height: 600,
      quality: 80
    };
    $cordovaImagePicker.getPictures(options)
      .then(function (imageData) {
        $scope.eventImage = imageData[0];
      }, function(error) {
        var alertPopup = $ionicPopup.alert({
          title: 'ERROR',
          template: error
        });
      });
  };

});
