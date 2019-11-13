import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';
import {connect} from 'react-redux'

class Prod extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false
        }
    }

    setValue = async (key, data) => {
        try {
        await AsyncStorage.setItem(key, data);
         console.log("Set Value:" +data)
        } catch (e) {
            console.log("Error e" + e)
        }
    }


    async removeItemValue(key) {
        try {
          await AsyncStorage.removeItem(key);
          return true;
        }
        catch(exception) {
          return false;
        }
      }

    render() {
        let products = this.props.products.map((product) => {

            return(
                 <Card key = {product.id}
                    containerStyle = {{height: 175, width: 175, justifyContent: 'center'}}
                 >
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Product', {IMG: product.images[0].src, title: product.title, desc: product.description, ID: product.id})}>
                    <Image source={{uri: product.images[0].src}} style = {styles.buttonStyle6} />
                    </TouchableOpacity>
                        <Button
                        onPress = {this.props.addItemToCart}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 1, width: 143, height: 45, backgroundColor: '#086522'}}
                        title={product.variants[0].price + "$"} />
                </Card> 
                
            )
        })
        return(
            <View style = {{flex: 1, alignContent:"space-between", justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap"}}>
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

export default connect(null, mapDispatchToProps)(Prod)