// Hasura API which creates and logs into an account by authenticating with google
import * as GoogleSignIn from 'expo-google-sign-in';

initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: '318411275550-f2ug4n6ht3t7noupl4jkfviumv6ml558.apps.googleusercontent.com',
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };
  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

function googleAPI() 
{
var url = "https://auth.moappetit.com/v1/signup";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "google",
    "data": {
        "access_token": "oauth-access-token"
    }
};

requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
	// To save the auth token received to offline storage
	 var authToken = result.auth_token
	 AsyncStorage.setItem('HASURA_AUTH_TOKEN', authToken);
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});
}

export default googleAPI;