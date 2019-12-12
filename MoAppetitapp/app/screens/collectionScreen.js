import React from 'react';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image, Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Icon, Container } from 'native-base';
import { Header } from 'react-native-elements';
import { string } from 'prop-types';
import CartIcon from '../containers/cartIcon';
import {Provider} from 'react-redux'
import store from '../redux/index'
import Prod from '../components/Product'
import { ScrollView } from 'react-native-gesture-handler';

// this page displays the products from "Collections" on the sidebar or when a user clicks on collection title on mainscreen
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
            <ScrollView>
            <Prod products = {this.state.collection.products} navigation = {this.props.navigation} client = {this.props.client} collection = {this.state.collection.title} />
            </ScrollView>
        </Container>
        </Provider>
        )
      }
}
