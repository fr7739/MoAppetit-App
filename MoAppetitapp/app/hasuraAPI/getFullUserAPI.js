// Added by IMI
const GET_USER_URL = "https://data.moappetit.com/v1/query";

// Function to call the API that adds the address to the address_table in Hasura (postgres db)
export const getFullUserAPI = async (data) => {
    let requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };

    let body = {  
        type: "select",
        args: {
            table: "user_info",
            "columns": ["*"],
            "where": {hasura_id: {_eq: global.hasura_id}}


        }
    };

    requestOptions.body = JSON.stringify(body);
    //console.log("Body: " + requestOptions.body);

    try {
        const response =  await fetch(GET_USER_URL, requestOptions); // returning the response generated by the API
            
        //console.log("Response object: " + response);
        //console.log("Response text: " + response.text());
        //console.log("returning: "+ response["returning"]);
        
        //console.log(response);
        return response;
    } catch (e) {
        console.log('Request Failed:' + e);
    }
};

    export default getFullUserAPI;

// END: Added by IMI