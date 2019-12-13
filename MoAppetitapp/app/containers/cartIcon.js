import React, {Component} from 'react';
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

// This renders the cart icon, along with the number that appears over it depicting the number of unique products that exist in the cart.

class CartIcon extends Component{
    render(){
        return(
    <View>
        {/* Links the page to the cart page from anywhere it is rendered. */}
            <TouchableOpacity style = {{ padding: 10 }}onPress = {() => this.props.navigation.navigate('Cart')}>
    
    {/* This checks to see if there are any items in the cart, assuming there is it will render a small circle with the number of unique items.
    This decides the appearance of the circle and the font of the number within. */}
    <View style = {{ padding: 5}}>
    {this.props.cartItems.cart.length ? (
        <View style = {{ position: 'absolute', height: 25, width: 25, borderRadius: 15, 
        backgroundColor: 'white', right: 15, bottom: 15, alignItems: "center", justifyContent: "center", zIndex: 2000}}>
            <Text style = {{color: "#086522", fontWeight: 'bold'}}> {this.props.cartItems.cart.length} </Text>
            
        </View>)
        : (null) }
        {/* The cart icon image */}
            <Icon name = 'md-cart' size = {30}/>
    </View>
    
    </TouchableOpacity>
    </View>
    )
    }
}

 //maps the cart items from the store so that the information can be rendered and manipulated
const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}
export default connect(mapStateToProps)(CartIcon);

//Added by Jordan Dickerson