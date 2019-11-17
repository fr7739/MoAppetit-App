import React from 'react';
import {Provider} from 'react-redux'
import store from '../redux/index'
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image, Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from '../screens/styles';
import { Icon, Container } from 'native-base';
import { Header } from 'react-native-elements';
import { client } from '../hasuraAPI/shopifyAPI';
import ProductPage from '../components/productPage'
import { string } from 'prop-types';
import CartIcon from '../containers/cartIcon';

export default class productScreen extends React.Component{
constructor(props){
    super(props);

    this.state ={
        productID: string,
        product: this.props.navigation.getParam('Product'),
    }
}

      render(){
        return(
           <Provider store = {store}>
          <Container>
          <Header transparent
          backgroundColor = "#086522"
          leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
          rightComponent={<CartIcon />} />
        <ProductPage product = {this.state.product} client = {client} navigation = {this.props.navigation}/>
        
        </Container>
        </Provider> 
        )
      }
}