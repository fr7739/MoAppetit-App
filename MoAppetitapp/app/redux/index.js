import {createStore} from 'redux'
import cartItems from './reducers/cartReducer'

//initializes the store utilizing the reducers contained within cartReducer.js
export default store = createStore(cartItems)

//Added by Jordan Dickerson