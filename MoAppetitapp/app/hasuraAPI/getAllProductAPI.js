// Added by IMI
const GET_ALL_PRODUCT_URL = "https://data.moappetit.com/v1/query";

// Function to call the API that adds the address to the address_table in Hasura (postgres db)
export const getAllProductsAPI = async data => {
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };

  let body = {
    //Set up what we need to send to hasura
    type: "select", //The query is going to be select
    args: {
      table: "product", //Selct form the products
      columns: ["*"] //* - mean select all fields
      /* "where": {user_id: {_eq: global.user_id}} */
    }
  };

  requestOptions.body = JSON.stringify(body); //prepared that body to more friendly object that hasura can read

  try {
    const respons = await fetch(GET_ALL_PRODUCT_URL, requestOptions); // returning the response generated by the API
    return respons;
  } catch (e) {
    console.log("Request Failed:" + e);
  }
};

export default getAllProductsAPI;

// END: Added by IMI
