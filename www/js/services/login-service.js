angular.module('LoginService', [])
 
.service('AuthService', function($q, $http, SERVER_URL) {

  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var user = {};
  var isAuthenticated = false;
  var authToken;

 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(data) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, data.auth_token);
    useCredentials(data);
  }
 
  function useCredentials(data) {
    user.email = data.email;
    user.fullName = data.fullName;
    user.birthdate = data.birthdate;
    user.gender = data.gender;
    user.is_private = data.is_private;
    user.bio = data.bio;

    isAuthenticated = true;
    authToken = data.auth_token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = 'Token token=' + data.auth_token;
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'api.crackplan.com'
  }

  function destroyUserCredentials() {
    authToken = undefined;
    user = {};
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(email, pw) {
    return $q(function(resolve, reject) {

      $http.post(SERVER_URL + '/login', { email: email, password: pw })
      .success(function(data){
        storeUserCredentials(data);
        resolve('Login success.');
      })
      .error(function(){
        reject('Login Failed.');
      });
    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    user: function() {return user;}
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