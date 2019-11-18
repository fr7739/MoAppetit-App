import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { List, Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container, Item } from 'native-base';
import {connect} from 'react-redux'


class Cart extends Component{
constructor(props){
    super(props)

    this.state ={
        cartTotal: 0,
    }
}
componentWillMount(){
addTotals = () => {
    let total = 0;
    this.props.cartItems.cart.map(item => (total += (item.variants[0].price * item.qty))); 
    console.log(total)
    this.setState({
        cartTotal: total,
      })
  };
}
   
    render() {
        let total = 0;
        let inCart = this.props.cartItems.cart.map((cartItem, index) => {

            return(
                cartItem.qty > 0 ? (
            <View key = {index} style = {{flexDirection: 'row', borderWidth: 1, borderTopWidth: 0}}>
            <TouchableOpacity onPress = {() => this.props.removeItem(cartItem)}>
            <Image style = {{ width: 100, height: 100}} source = {{uri: cartItem.images[0].src}} /> 
            </TouchableOpacity>
            <Text>{cartItem.title}     -    {cartItem.variants[0].price}    x   {cartItem.qty} = {(cartItem.variants[0].price * cartItem.qty).toFixed(2)} </Text>   
            <Text style = {{flex: 0, position:'absolute', opacity: 0}}>{total = total + (cartItem.variants[0].price * cartItem.qty)}</Text>
            </View> 
            )      
            : (null)
            )
            
        })
        return(
    this.props.cartItems.cart.length > 0 ?(
        <ScrollView>
                {inCart}
                <View style = {{justifyContent: 'space-around', flex: 1}}>
                <Text>Tax: {(total * .06).toFixed(2)}</Text>
                <Text>Total: {total.toFixed(2)}</Text>
            </View>
        </ScrollView>
        
    )
    :
    (<Text>No Items in Cart.</Text>)
        )
    }
}






const mapDispatchToProps = (dispatch) =>{
    return{
      addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
      decrementCart: (product) => dispatch({type: 'DECREMENT_FROM_CART', payload: product}),
      removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART', payload: product})
    }
  }
  const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)