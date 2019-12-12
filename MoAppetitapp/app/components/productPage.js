import React, {Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { Icon} from 'native-base';
import Reviews from './Reviews'
import {connect} from 'react-redux'

// display the products on mainscreen and user can click on a apecific product then see more details of it.
// User can add and remove the product on the cart
class productPage extends Component {
constructor(props){
    super(props)

}

    render(){

            return(
                <View style= {{flex: 1}}>
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
                            icon={<Icon name='md-cart' color='#ffffff' style = {{padding: 2}} />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#086522'}}
                        title='ADD TO CART' />
                    {this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === this.props.product.id)] 
                    && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === this.props.product.id)].id === this.props.product.id 
                    && this.props.cartItems[this.props.cartItems.findIndex(prod => prod.id === this.props.product.id)].qty >= 1 ?    
                        (<Button
                            onPress = {() => this.props.removeItem(this.props.product)}
                            icon={<Icon name='md-close' color='#CC0000' style = {{padding: 2}} />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#CC0000', marginTop: 3}}
                        title='REMOVE ALL FROM CART' />) : (null)}
                </Card> 
                <ScrollView
                horizontal = {true}
                showsHorizontalScrollIndicator = {false}
                style = {{padding: 5, margin: 0}}
                >
                 <Reviews prodName = {this.props.product.title}/>
                </ScrollView>
                <Button onPress = {() => this.props.navigation.navigate('Ratings', {rateMe: this.props.product.title})} />
                </View>
            )
        }

        componentDidUpdate(prevProps, prevState, snapshot){
            
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
            cartItems: state.cart
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(productPage)