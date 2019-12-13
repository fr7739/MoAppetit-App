import React, {Component} from 'react';
import { Card, Button } from 'react-native-elements';
import {View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles';
import {connect} from 'react-redux'

//This page displays the products

class collectionPage extends Component {
constructor(props){
    super(props)

    this.state ={
    }
}


    render(){
        let colProd = this.props.collections.products.map((product) => {
            return(
                <Card key = {product.id}
                   containerStyle = {{height: 175, width: 175, justifyContent: 'center'}}
                >
                    {/* Renders the product images and makes them touchable links to the product page */}
                   <TouchableOpacity onPress = { () => this.props.navigation.navigate('Product', {Product: product})}>
                   <Image source={{uri: product.images[0].src}} style = {styles.buttonStyle6} />
                   </TouchableOpacity>
                   {/* Image render end */}

                       <Button
                        onPress = {() => this.props.addItemToCart(product)}
                       buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 1, width: 143, height: 45, backgroundColor: '#086522'}}
                       title={product.variants[0].price + "$"} />
               </Card> 
            )
        })
            return(
            <ScrollView>
            <View style = {{flex: 1, alignContent:"space-between", justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap", backgroundColor: 'white'}}>
            {colProd}
            </View>
            </ScrollView>

            )
        }
    }
   //Dispatches a shopping function so that it can be used
    const mapDispatchToProps = (dispatch) =>{
        return{
          addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product})
        }
      }
      //maps the cart items from the store so that the information can be rendered and manipulated
      const mapStateToProps = (state) => {
        return {
            cartItems: state
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(collectionPage)        
    
        