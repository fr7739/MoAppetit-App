export const addToCart = (items, product) => (dispatch) =>{

let prodInCart = false;
items.array.forEach(item => {
    if (item.id === product.id){
        prodInCart = true;
        item.count++;
    }
});
if(!prodInCart){
    items.push({...product, count: 1})
}
return dispatch({
    type: 'ADD_TO_CART',
    payload:{
        cartItems: product
    }
})
}