import Client from 'shopify-buy'

export const client = Client.buildClient({
    storefrontAccessToken: '2763c1f0442c1bdc5f321bedee622211',
    domain: 'xmartdelivery.myshopify.com',
    appId: 2,
});


/* let prod = 

    client.product.fetchAll().then( products => {
    // Do something with the product
    console.log(products[0]);
    console.log("This is hopefully a product name: " +products[0].title+ " and Price: " +products[0].description)
    return products[0];
  }).catch(e => {
      console.log('Caught error: ' +e)
  });   */