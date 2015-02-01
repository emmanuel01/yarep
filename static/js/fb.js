  window.fbAsyncInit = function() {
    FB.init({
             appId      : '1568273430125647',
             cookie     : true, //enable cookies to allow the server to access the session
             xfbml      : true, // parse social plugins on this page
             version    : 'v2.2'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //testAPI();
      loginToApp(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      login();
      //document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      login();
      //document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    });
  }

          //FB.getLoginStatus(function(response) {
          //   statusChangeCallback(response);
          //});

   //};

  // Login
  function login() {
    FB.login(function(response) {
        loginStatusCallback(response);
    }, {scope: 'public_profile,email'});
  }

  // Called after login
  function loginStatusCallback(response) {
      if (response.status === 'connected'){
          loginToApp(response.authResponse.accessToken);
      } else if (response.status === 'not_authorized'){
          alert('Your login was unsuccessful. Try again or use some other method of login!');
      } else {
          alert('Your login was unsuccessful. Try again or use some other method of login!');
      }
  }

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function loginToApp(accessToken) {
      FB.api('/me', function(response) {
          var name = response.name;
          var email = response.email;
          var csrf_token = $("[name=csrfmiddlewaretoken]").val();
          $.post('/fblogin/', {
              'name': name,
              'email': email,
              'csrfmiddlewaretoken': csrf_token,
              'pwd': accessToken
      }, function(data){
          if (data == "Ok"){
              location.href = "/profile/";
          } else {
              alert("Could not log you in. Please try again later.");
          }
      });
    });
  }