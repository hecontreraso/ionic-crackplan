angular.module('LoginService', [])
 
.service('AuthService', function($q, $http, SERVER_URL) {
  var AUTH_TOKEN = '';
  var email = '';
  var name = '';
  var birthdate = '';
  var gender = '';
  var is_private = '';
  var bio = '';

  var isAuthenticated = false;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(AUTH_TOKEN);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(data) {
    window.localStorage.setItem(AUTH_TOKEN, data.auth_token);
    
    email = data.email;
    name = data.name;
    birthdate = data.birthdate;
    gender = data.gender;
    is_private = data.is_private;
    bio = data.bio;
  }
 
  function useCredentials(token) {
    isAuthenticated = true;    

    // Set the token as header for your requests!
    $http.defaults.headers.common['Authorization'] = 'Token token=' + token;
  }
 
  var login = function(email, pw) {
    return $q(function(resolve, reject) {

      $http.post(SERVER_URL + '/login',
        {
          email: email, password: pw
        }
      )
      .success(function(data){
        console.log(data);
        storeUserCredentials(data);
        resolve('Login success.');
      })
      .error(function(){
        reject('Login Failed.');
      });
    });
  };
 
  var logout = function() {
    AUTH_TOKEN = '';
    email = '';
    name = '';
    birthdate = '';
    gender = '';
    is_private = '';
    bio = '';

    isAuthenticated = false;
    $http.defaults.headers.common['Authorization'] = undefined;
    window.localStorage.clear();
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    email: function() {return email;},
    name: function() {return name;},
    birthdate: function() {return birthdate;},
    gender: function() {return gender;},
    is_private: function() {return is_private;},
    bio: function() {return bio;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});