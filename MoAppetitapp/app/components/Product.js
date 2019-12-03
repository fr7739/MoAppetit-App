import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';
import {connect} from 'react-redux'
import Collection from './Collection';

class Prod extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false
        }
    }


    render() {
        let products = this.props.products.map((product) => {
            return(
              <View key = {[product.id]}>
                 <Card 
                    containerStyle = {{height: 250, width: 175, justifyContent: 'center', margin: 1, borderWidth: 0,}}
                 >
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Product', {Product: product})}>
                    <Image source={{uri: product.images[0].src}} style = {styles.buttonStyle6} />
                    </TouchableOpacity>
                        <TouchableOpacity
                        onPress = {() => this.props.addItemToCart(product)}
                        style={{borderRadius: 50, borderWidth: 0,height: 25, width: 25, backgroundColor: '#086522', position: "absolute", padding: 5, right: 1, top: 1}}
                        title={product.variants[0].price + "$"}><Text adjustsFontSizeToFit minimumFontScale= {.5} style = {{fontWeight: 'bold', color: 'white', textAlign: 'right', fontSize: 8}}> {this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)] && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)].id === product.id ? (this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)].qty) : ("+")}  </Text></TouchableOpacity>
                        <Text>{product.title}</Text>
                        <Text numberOfLines = {1} style = {{fontSize: 8}}>{product.description}</Text>
                        <Text style = {{fontWeight: 'bold', alignContent: 'center',}}>${product.variants[0].price}{ this.props.collection === 'Poultry' || this.props.collection === 'Seafood' || this.props.collection === 'Lamb' || this.props.collection === 'Beef' ? ( "/lb") : (" ea")} </Text>
                </Card> 
                </View>
            )
        })
        return(
            <View style = {{flex: 1, justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap", backgroundColor: 'white', padding: 0, margin: 0, marginTop: 3, marginBottom: 3, paddingRight: 1, borderWidth: 0, minWidth: 500}}>
            {products}
            </View>
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
        cartItems: state.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prod)