import getFullUserAPI from "./getFullUserAPI";

// Added by IMI
const GET_RATING_URL = "https://data.moappetit.com/v1/query";

// Function to call the API that adds the address to the address_table in Hasura (postgres db)
export const getAllProductAPI = async (data) => {
    let requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };


    ///Leave code incase we want to do by User
    //If there is no user ID, get it based on the hasura_id that we know exists
    //if(global.user_id == null)
   // {
    //    const passInUserObject = {
    //        hasura_id: global.hasura_id 
      //    }
    //  
      //    let getFullUserResponse = await getFullUserAPI(passInUserObject);
     //     const resultResponseGetFullUser = await getFullUserResponse.json();
    //      global.user_id = resultResponseGetFullUser[0].id;
  //  }
    //console.log("Global UserID: "+global.user_id);
    let body = {  
        type: "select", //query type is select
        args: {
            table: "rating", //the rating table
            "columns": ["*"] // get all the coloumns
         /*  , "where": {user_id: {_eq: global.user_id}} */
        }
    };

    /*Get user ID from Hasura*/
 



    requestOptions.body = JSON.stringify(body); //prepared that body to more friendly object that hasura can read
    console.log("Body ddd: " + requestOptions.body);

    try {
        const respons =  await fetch(GET_RATING_URL, requestOptions); // returning the response generated by the API
        
        return respons;
    } catch (e) {
        console.log('Request Failed:' + e);
    }
};

export default getAllProductAPI;

// END: Added by IMI