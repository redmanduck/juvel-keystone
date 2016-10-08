function fbStatusChangeCallback(response) {
    console.log(response);

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log('fbStatusChangeCallback connected');

      //TODO: check if user is in juvel server
      //- if yes: redirect home
      //- if no: redirect /signup
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log("Please login to app")
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log("please login to fb")
    }
}

function fbCheckLoginState() {
    FB.getLoginStatus(function(response) {
      fbStatusChangeCallback(response);
    });
}