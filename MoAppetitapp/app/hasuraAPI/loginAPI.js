// Login API function which takes in an email and a password and passes them 
// to Hasura to authenticate and return a response
// Got code directly from Hasura
// TODO: validation still needs to be done and shown in the UI
import React from 'react';
const LOGIN_URL = "https://auth.moappetit.com/v1/login"

const loginAPI = async (data) => {
    let requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };
        
    let body = {
            provider: "email",
            data: {
                email: (data.email).toLowerCase(),
                password: data.password
            }
        };
        requestOptions.body = JSON.stringify(body);
    try{
         const response = await fetch(LOGIN_URL, requestOptions)
        // const result = await response.json() // result.auth_token will return the auth token for current session
        // console.log(result)
        /*if(response.status !== 200){
            const error = result.message
            callback(error)
    } 
        else {
          const error = 'noerror'
          callback(error);
    }*/
        return response;
    }   catch (e) { 
        console.log("Request Failed: " + e.message);
    }
};

export default loginAPI;
// DONE: Added by Salwa