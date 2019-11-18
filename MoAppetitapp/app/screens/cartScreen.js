
import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Animated, Platform } from 'react-native';

import {Button} from 'react-native-material-ui';
import { Header } from 'react-native-elements';
import { Icon } from 'native-base';
import {Provider} from 'react-redux'
import store from '../redux/index'
import Cart from '../components/Cart';
import CartIcon from '../containers/cartIcon';



export default class CartScreen extends React.Component {
    constructor()
    {
        super();
    }
 
    
 
    render()
    {
        return(
            <Provider store = {store}>
        <Header transparent
          backgroundColor = "#086522"
          leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
          rightComponent={<CartIcon navigation = {this.props.navigation} />} />
            <Cart />
            </Provider>
        )
    }

}
 
const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
    },
 
    Animated_View_Style:
    {
        height: 70,
        backgroundColor: '#72a0c1',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
 
    View_Inside_Text:
    {
        color: '#fff',
        fontSize: 24
    },
 
    TouchableOpacityStyle:{
  
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
 
    FloatingButtonStyle: {
  
      resizeMode: 'contain',
      width: 50,
      height: 50,
    }
});