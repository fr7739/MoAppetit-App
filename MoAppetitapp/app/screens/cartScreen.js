
import React from 'react';
import { Header } from 'react-native-elements';
import { Icon } from 'native-base';
import {Provider} from 'react-redux'
import store from '../redux/index'
import Cart from '../components/Cart';
import CartIcon from '../containers/cartIcon';



export default class CartScreen extends React.Component {
    constructor()
    {
        super();
    }
 
    
 
    render()
    {
        return(
            <Provider store = {store}>
                
                {/* Calls a special header that allows our created cart icon to be used */}
                <Header transparent
                    backgroundColor = "#086522"
                    leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
                    rightComponent={<CartIcon navigation = {this.props.navigation} />} 
                />
                
                {/* Calls the cart component to disply the objects contained within the cart */}
                <Cart />

            </Provider>
        )
    }

}
 
//Jordan Dickerson