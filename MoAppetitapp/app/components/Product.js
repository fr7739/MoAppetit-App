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


    render() {
        let products = this.props.products.map((product) => {

            return(
              <View key = {product.id}>
                 <Card 
                    containerStyle = {{height: 250, width: 175, justifyContent: 'center', margin: 0, borderWidth: 0}}
                 >
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Product', {Product: product})}>
                    <Image source={{uri: product.images[0].src}} style = {styles.buttonStyle6} />
                    </TouchableOpacity>
                        <TouchableOpacity
                        onPress = {() => this.props.addItemToCart(product)}
                        style={{borderRadius: 50, borderWidth: 2,height: 40, width: 40, backgroundColor: '#086522', justifyContent: 'center', alignItems: 'center', position: "absolute", padding:5, right: 1, top: 1}}
                        title={product.variants[0].price + "$"}><Text style = {{fontWeight: 'bold', color: 'white', alignContent: 'center', fontSize: 20}}> + </Text></TouchableOpacity>
                        <Text>{product.title}</Text>
                        <Text numberOfLines = {2} style = {{fontSize: 8}}>{product.description}</Text>
                        <Text style = {{fontWeight: 'bold', alignContent: 'center',}}>{product.variants[0].price}</Text>
                </Card> 
                <TouchableOpacity
                onPress = {() => this.props.addItemToCart(product)}
                style={{borderRadius: 50, borderWidth: 2,height: 40, width: 40, backgroundColor: '#086522', justifyContent: 'center', alignItems: 'center', position: "absolute", padding:5, right: 1, top: 1}}
                title={product.variants[0].price + "$"}><Text style = {{fontWeight: 'bold', color: 'white', alignContent: 'center', fontSize: 20}}> + </Text></TouchableOpacity>
                </View>
            )
        })
        return(
            <View style = {{flex: 1, justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap", backgroundColor: 'white', padding: 0, margin: 0, marginTop: 3, marginBottom: 3, paddingRight: 1, borderWidth: 0, borderColor: 'gray', minWidth: 500}}>
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