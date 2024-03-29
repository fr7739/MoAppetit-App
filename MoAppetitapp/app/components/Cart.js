import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
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
                <View style= {{flexDirection: 'row', borderWidth: 0, borderTopWidth: 0}}>
                    <View style= {{flexDirection: 'column', borderWidth: 0, borderTopWidth: 0, paddingRight: 2, marginRight: 2, alignItems: 'center', justifyContent: 'center', width: 200}}>
                        <Text>Item: {cartItem.title}</Text> 
                        <Text>Price: ${cartItem.variants[0].price}</Text> 

                        {/* Calculates the subtotal for each product. */}
                        <Text>Subtotal: ${(cartItem.variants[0].price * cartItem.qty).toFixed(2)} </Text>  
            
                        {/* Invisibly calculates the total price. */}
                        <Text style = {{flex: 0, position:'absolute', opacity: 0}}>{total = total + (cartItem.variants[0].price * cartItem.qty)}</Text>
                    </View>
                    <View style= {{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderTopWidth: 0, right: 1, paddingLeft: 20}}>
                
                        {/* This section controls the + button that appears on the right side of the Cart screen */}
                        <TouchableOpacity
                            onPress = {() => this.props.addItemToCart(cartItem)}
                            style={{borderRadius: 50, borderWidth: 2,height: 30, width: 30, backgroundColor: '#086522', justifyContent: 'center', alignItems: 'center', position: "relative", padding:4}}
                            title={cartItem.variants[0].price + "$"}>
                                <Text style = {{fontWeight: 'bold', color: 'white', alignContent: 'center', fontSize: 20}}> + </Text>
                        </TouchableOpacity>
                        <Text>{cartItem.qty} </Text> 
            
                        {/* This section checks and renders a minus button only if the number of that object in the cart is greater than 1
                        If the number is greater than 1 then it renders a button utilizing the decrement function*/}
                        {cartItem.qty > 1 ?
                            (
                                <TouchableOpacity
                                    onPress = {() => this.props.decrementCart(cartItem)}
                                    style={{borderRadius: 50, borderWidth: 2,height: 30, width: 30, backgroundColor: '#086522', justifyContent: 'center', alignItems: 'center', position: "relative", padding:4}}
                                    title={cartItem.variants[0].price + "$"}
                                >
                            
                                    <Text style = {{fontWeight: 'bold', color: 'white', alignContent: 'center', fontSize: 20}}> - </Text>
                    
                                </TouchableOpacity>
                            ) 
            
                            : 
                            /* This section checks and renders a minus button only if the number of that object in the cart is greater than 1
                            If the number is greater than 1 then it renders a button utilizing the removeitem function*/
                            (
                                <TouchableOpacity
                                    onPress = {() => this.props.removeItem(cartItem)}
                                    style={{borderRadius: 50, borderWidth: 2,height: 30, width: 30, backgroundColor: '#086522', justifyContent: 'center', alignItems: 'center', position: "relative", padding:4}}
                                    title={cartItem.variants[0].price + "$"}
                                >
                                        
                                        <Text style = {{fontWeight: 'bold', color: 'white', alignContent: 'center', fontSize: 20}}> - </Text>
                                
                                </TouchableOpacity>
                            )
            
                        }
                    </View>
                </View>
            </View> 
            )      
            : (null)
            )
            
        })
        return(
            // Checks to see if anything is in the cart. If nothing is, it renders a link back to the Main Screen
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
        cartItems: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

//Added by Jordan Dickerson