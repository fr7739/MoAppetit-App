import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { List, Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container, Item } from 'native-base';
import {connect} from 'react-redux'


class Cart extends Component{

    render() {
        let inCart = this.props.cartItems.map((cartItem, index) => {

            return(
            <View key = {index} style = {{flexDirection: 'row', borderWidth: 1, borderTopWidth: 0}}>
            <Image style = {{ width: 100, height: 100}} source = {{uri: cartItem.images[0].src}} /> 
            <Text>{cartItem.title}     -     {cartItem.variants[0].price}</Text>   
            </View>         
            )
        })
        return(
            this.props.cartItems.length > 0 ?(
                <ScrollView>
                {inCart}
                </ScrollView>
                )
            :
            (<Text>No Items in Cart.</Text>)
        )
    }
}






const mapDispatchToProps = (dispatch) =>{
    return{
      addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product})
    }
  }
  const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)