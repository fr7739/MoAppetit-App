import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../screens/styles'
import { Card } from 'react-native-elements'
import {connect} from 'react-redux'

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
                  {/* This section decides what the individual product cards will look like */}
                 <Card 
                    containerStyle = {{height: 250, width: 175, justifyContent: 'center', margin: 1, borderWidth: 0,}}
                 >
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Product', {Product: product})}>
                    <Image source={{uri: product.images[0].src}} style = {styles.buttonStyle6} />
                    </TouchableOpacity>
                        {/* This section controls the + button that appears over the image on the main screen */}
                        <TouchableOpacity
                            onPress = {() => this.props.addItemToCart(product)}
                            style={{borderRadius: 50, borderWidth: 0,height: 25, width: 25, backgroundColor: '#086522', position: "absolute", padding: 4, right: 1, top: 1}}
                            title={product.variants[0].price + "$"}>
                            
                            {/* This section checks the number of the item in the redux cart and renders it onto the button if it is greater than 1
                             otherwise it renders a + symbol */}
                            <Text adjustsFontSizeToFit minimumFontScale= {.5} style = {{fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 10}}> 
                                {this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)] 
                                && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)].id === product.id ? 
                                (this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)].qty) 
                                : ("+")}  
                            </Text>
                        
                    </TouchableOpacity>
                    {/* + button end */}
                        {/* The title that appears in the card */}
                        <Text>
                            {product.title}
                        </Text>
                        
                        {/* The description that appears on the product card, limited to a single line by the client's request */}
                        <Text numberOfLines = {1} style = {{fontSize: 8}}>
                            {product.description}
                        </Text>

                        {/* Manually checks the collection of the object and displays more details on the pricing. This information is not stored in the shopify database, 
                        so the client requested that it be hardcoded*/}
                        <Text style = {{fontWeight: 'bold', alignContent: 'center',}}>
                            ${product.variants[0].price}{ this.props.collection === 'Poultry' || this.props.collection === 'Seafood' || this.props.collection === 'Lamb' || this.props.collection === 'Beef' ? ( "/lb") : (" ea")} 
                        </Text>

                        {/* This section checks and renders a minus button only if the number of that object in the cart is greater than 1
                        If the number is greater than 1 then it renders a button utilizing the decrement function*/}
                        {this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)] 
                        && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)].id === product.id 
                        && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)].qty > 1 ?
                            (
                                <TouchableOpacity
                                    onPress = {() => this.props.decrementCart(product)}
                                    style={{borderRadius: 50, borderWidth: 0,height: 25, width: 25, backgroundColor: '#CC0000', position: "absolute", padding: 4, right: 1, bottom: 1, marginBottom: 60 }}
                                    title={product.variants[0].price + "$"}>
                                
                                        <Text style = {{fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 10}}> - </Text>
                           
                                </TouchableOpacity>
                            ) 
            
                            : 
                            (null)
            
                        }

                        {/* This section checks and renders a minus button only if the number of that object in the cart is greater than 1
                        If the number is greater than 1 then it renders a button utilizing the removeitem function*/}
                        {this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)] && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)].id === product.id && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === product.id)].qty === 1 ?
                            (
                                <TouchableOpacity
                                    onPress = {() => this.props.removeItem(product)}
                                    style={{borderRadius: 50, borderWidth: 0,height: 25, width: 25, backgroundColor: '#CC0000', position: "absolute", padding: 4, right: 1, bottom:1, marginBottom: 60 }}
                                    title={product.variants[0].price + "$"}>
                                        
                                        <Text style = {{fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 10}}> - </Text>
                                
                                </TouchableOpacity>
                            ) 
            
                            : 
                            (null)
            
                        }

                </Card> 
                </View>
            )
        })
        return(

            // Controls the layout of the cards
            <View style = {{flex: 1, justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap", backgroundColor: 'white', padding: 0, margin: 0, marginTop: 3, marginBottom: 3, paddingRight: 1, borderWidth: 0, minWidth: 500}}>
            {products}
            </View>
        )
    }
}

//Dispatches the shopping functions so that they can be used
const mapDispatchToProps = (dispatch) =>{
    return{
      addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
      decrementCart: (product) => dispatch({type: 'DECREMENT_FROM_CART', payload: product}),
      removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART', payload: product})
    }
  }

//maps the cart items from the store so that the information can be rendered and manipulated
const mapStateToProps = (state) => {
    return {
        cartItems: state.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prod)
//Jordan Dickerson