import React, {Component} from 'react';
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CartIcon extends Component{
    render(){
        return(
    <View>
            <TouchableOpacity style = {{ padding: 10 }}onPress = {() => this.props.navigation.navigate('Cart')}>
    
    
    <View style = {{ padding: 5}}>
    {this.props.cartItems.cart.length ? (
        <View style = {{ position: 'absolute', height: 25, width: 25, borderRadius: 15, 
        backgroundColor: 'white', right: 15, bottom: 15, alignItems: "center", justifyContent: "center", zIndex: 2000}}>
            <Text style = {{color: "#086522", fontWeight: 'bold'}}> {this.props.cartItems.cart.length} </Text>
            
        </View>)
        : (null) }
            <Icon name = 'md-cart' size = {30}/>
    </View>
    
    </TouchableOpacity>
    </View>
    )
    }
}
const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}
export default connect(mapStateToProps)(CartIcon);