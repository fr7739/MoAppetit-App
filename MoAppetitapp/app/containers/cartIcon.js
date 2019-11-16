import React from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CartIcon = (props) =>{
    return(
    <TouchableOpacity style = {{ padding: 10 }}onPress = {() => props.navigation.navigate('Cart')}>
    <View style = {{ padding: 5}}>
        <View style = {{ position: 'absolute', height: 25, width: 25, borderRadius: 15, 
        backgroundColor: 'white', right: 15, bottom: 15, alignItems: "center", justifyContent: "center", zIndex: 2000}}>
            <Text style = {{color: "#086522", fontWeight: 'bold'}}> {props.cartItems.length} </Text>

        </View>
            <Icon name = 'md-cart' size = {30}/>
    </View>
    </TouchableOpacity>
    )
}
const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}
export default connect(mapStateToProps)(CartIcon);