angular.module('UserService', [])
 
.service('UserService', function($http, SERVER_URL) {

  var loadPrivacy = function(){
    return window.localStorage.getItem('is_private');
  };

  var changePrivacy = function(is_private){
    return $http.post(SERVER_URL + '/change_privacy', 
      { is_private: is_private }
    ).then(function(){
      window.localStorage.setItem('is_private', is_private);    
    });
  };

  // User data is loaded an stored in localStorage when the user log in the app
  var getlocalUserData = function(){
    return user = {
      name: window.localStorage.getItem('name'),
      bio: window.localStorage.getItem('bio'),
      email: window.localStorage.getItem('email'),
      birthdate: new Date(window.localStorage.getItem('birthdate')),
      gender: window.localStorage.getItem('gender')
    };
  };

  var setlocalUserData = function(user){
    window.localStorage.setItem('name', user.name);
    window.localStorage.setItem('bio', user.bio);
    window.localStorage.setItem('email', user.email);
    window.localStorage.setItem('birthdate', user.birthdate);
    window.localStorage.setItem('gender', user.gender);  
  };

  var updateProfile = function(user){
    return $http.patch(SERVER_URL + '/edit_profile', { user: user })
      .success(function(){
        setlocalUserData(user);
      })
      .error(function(data){
        console.log("Error making the request");
        console.log(user);
      });
  };

  var changePassword = function(password, new_password){
    return $http.post(SERVER_URL + '/change_password',
      { password: password, new_password: new_password }
    )
    .success(function(){
    })
    .error(function(err){
      console.log("Error making the request");
      console.log(err);
    });
  };

  return {
    loadPrivacy: loadPrivacy,
    changePrivacy: changePrivacy,
    updateProfile: updateProfile,
    getlocalUserData: getlocalUserData,
    changePassword: changePassword
  };
});