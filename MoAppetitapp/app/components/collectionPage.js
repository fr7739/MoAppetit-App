import React, {Component} from 'react';
import { Card, Button } from 'react-native-elements';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Icon, Container } from 'react-native';
import styles from '../screens/styles';
import {connect} from 'react-redux'



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
                   <TouchableOpacity onPress = { () => this.props.navigation.navigate('Product', {Product: product})}>
                   <Image source={{uri: product.images[0].src}} style = {styles.buttonStyle6} />
                   </TouchableOpacity>
                       <Button
                        onPress = {() => this.props.addItemToCart(product)}
                       buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 1, width: 143, height: 45, backgroundColor: '#086522'}}
                       title={product.variants[0].price + "$"} />
               </Card> 
            )
        })
            return(
            <ScrollView>
            {colProd}
            </ScrollView>

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
            cartItems: state
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(collectionPage)        
    
        