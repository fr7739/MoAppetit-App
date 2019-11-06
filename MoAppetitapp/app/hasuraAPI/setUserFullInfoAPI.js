// Added by IMI
const SET_USER_URL = "https://data.moappetit.com/v1/query";

// Function to call the API that adds the user to the user_table in Hasura (postgres db)
export const setUseFullInfoAPI = async data => {
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(data);
  let body = {
    type: "update",
    args: {
      where: { hasura_id: parseInt(data.hasura_id) },
      table: "user_info",
      $set: {
        name: data.name.toLowerCase(),
        phone: data.phone
      }
    }
  };

  requestOptions.body = JSON.stringify(body);

  try {
    return await fetch(SET_USER_URL, requestOptions); // returning the response generated by the API
  } catch (e) {
    console.log("Request Failed:" + e);
  }
};

export default setUseFullInfoAPI;

// END: Added by IMI
