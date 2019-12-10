import React from 'react';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image, Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Icon, Container } from 'native-base';
import { Header } from 'react-native-elements';
import { client } from '../hasuraAPI/shopifyAPI';
import { string } from 'prop-types';
import CollectionPage from '../components/collectionPage';
import CartIcon from '../containers/cartIcon';
import {Provider} from 'react-redux'
import store from '../redux/index'
import Prod from '../components/Product'


export default class collectionScreen extends React.Component{
constructor(props){
    super(props);

    this.state ={
        collection: this.props.navigation.getParam('Connection'),
        collectionID: string,
    }
}
      render(){
        return(
            <Provider store = {store}>
            <Container>
            <Header transparent
            backgroundColor = "#086522"
            leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
            rightComponent={<CartIcon navigation = {this.props.navigation} />} />
            <Prod products = {this.state.collection.products} navigation = {this.props.navigation} client = {this.props.client} collection = {this.state.collection.title} />
        
        </Container>
        </Provider>
        )
      }
}
