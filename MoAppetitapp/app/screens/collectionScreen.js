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




export default class collectionScreen extends React.Component{
constructor(props){
    super(props);

    this.state ={
        collection: this.props.navigation.getParam('Collection'),
        updated: false,
    }
}
      render(){
        return(
            <Container>
            <Header transparent
            backgroundColor = "#086522"
            leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
            rightComponent={<CartIcon />} />
        <CollectionPage collection = {this.state.collection} client = {client} navigation = {this.props.navigation} />
        
        </Container>
        )
      }
}
