import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';
import {connect} from 'react-redux'
class productPage extends Component {
constructor(props){
    super(props)

}

    render(){

            return(

                <Card
                    title={this.props.product.title}
                    image={{uri: this.props.product.images[0].src}}>
                    <Text style={{marginBottom: 10}}>
                        {this.props.product.description}
                    </Text>
                    <View
                    style = {{padding: 0, margin: 0, justifyContent: 'flex-start', flexDirection: "column", flexWrap: 'wrap', backgroundColor: 'white', position: 'relative'}}
                    >
                    <Text style={{marginBottom: 10, marginTop: 10, fontWeight: "bold"}}>
                        Number in cart: {this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === this.props.product.id)] && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === this.props.product.id)].id === this.props.product.id ? (this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === this.props.product.id)].qty) : ("0")} 
                    </Text>
                    <Text style={{marginBottom: 10, marginTop: 10, fontWeight: "bold"}}>
                    Price: {this.props.product.variants[0].price}$
                    </Text>
                    </View>
                        <Button
                            onPress = {() => this.props.addItemToCart(this.props.product)}
                            icon={<Icon name='md-cart' color='#ffffff' style = {{padding: 1}} />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#086522'}}
                        title='ADD TO CART' />
                </Card> 

            )
        }

        componentDidUpdate(prevProps, prevState, snapshot){
            
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
    
    export default connect(mapStateToProps, mapDispatchToProps)(productPage)