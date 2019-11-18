const cartItems = (state = {cart: [], qty:1 }, action) =>{
    const { type, payload } = action
    switch(action.type)
    {
        case 'ADD_TO_CART': {
            const productId = payload.id
            
            if (state.cart.findIndex(product => product.id === productId) !== -1) {
              const cart = state.cart.reduce((cartIT, product) => {
                if (product.id === productId) {
                    console.log(product.qty)
                  cartIT.push({ ...product, qty: product.qty + 1 }) // Increment qty
                } else {
                  cartIT.push(product)
                }
          
                return cartIT
              }, [])
          
              return { ...state, cart }
            }
          
            return { ...state, cart: [...state.cart, { ...payload, qty: 1 }] }
          }
        case 'REMOVE_FROM_CART':
            console.log(action.payload.id)
            return state.cart.filter(cartItem => cartItem.id !== action.payload.id)
    }
    return state
}

export default cartItems;