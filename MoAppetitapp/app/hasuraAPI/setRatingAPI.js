// Added by IMI
import getFullUserAPI from "./getFullUserAPI";

const SET_RATING_URL = "https://data.moappetit.com/v1/query";

// Function to call the API that adds the rating to the rating table in Hasura (postgres db)
export const setRatingAPI = async data => {
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };

  //If there is no user ID, get it based on the hasura_id that we know exists
  if (global.user_id == null) {
    const passInUserObject = {
      hasura_id: global.hasura_id
    };
    let getFullUserResponse = await getFullUserAPI(passInUserObject);

    if (getFullUserResponse.status == 200) {
      const resultResponseGetFullUser = await getFullUserResponse.json();
      global.user_id = resultResponseGetFullUser[0].id;
    }
  }
  if (global.user_id != null) {
    data.user_id = global.user_id;
  }

  let body = {
    type: "insert",
    args: {
      table: "rating",
      objects: [
        {
          ratinglevel: parseInt(data.ratingLevel, 10),
          ratingDescription: data.ratingDescription,
          product_id: parseInt(data.product_id, 10),
          user_id: parseInt(data.user_id),
          product_name: data.product_name
        }
      ]
    }
  };

  requestOptions.body = JSON.stringify(body);

  try {
    const respons = await fetch(SET_RATING_URL, requestOptions); // returning the response generated by the API
    return respons;
  } catch (e) {
    console.log("Request Failed:" + e);
  }
};

export default setRatingAPI;

// END: Added by IMI
