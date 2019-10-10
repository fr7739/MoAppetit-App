import * as Facebook from 'expo-facebook';

appId = "389761161955132";
const facebookAPI = async (token) => {
  //var fetchAction =  require('fetch');

  var url = "https://auth.charisma19.hasura-app.io/v1/signup";
  
  let requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
};

let body = {
    provider: "facebook",
    data: {
      "access_token": token
    }
};
requestOptions.body = JSON.stringify(body);
try{
const response = await fetch(url, requestOptions)

return response;
}   catch (e) { 
console.log("Request Failed: " + e.message);
}

} 

async function facebooklogIn(){
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync('389761161955132', {
      permissions: ['public_profile', 'email'],
    });
    console.log("Function ran!: " +token);

    if (type === 'success') {
      console.log("Function succeeded");

      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
      console.log('response', response)
      const json = await response.json();
      console.log('EMAIL', json)
      facebookAPI(token);
      return response;
    } else {
      type === 'cancel'
      console.log("Function Failed : " +type)
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
    console.log("Function Failed");
  }
}

export default facebooklogIn;