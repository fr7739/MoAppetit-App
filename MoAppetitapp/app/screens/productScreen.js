import React from 'react';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image, Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from '../screens/styles';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import { client } from '../hasuraAPI/shopifyAPI';
import ProductPage from '../components/productPage'
import { string } from 'prop-types';

export default class productScreen extends React.Component{
constructor(props){
    super(props);

    this.state ={
        productID: string,
        product: '',
        productIMG: ''
    }
}

async getProdID(){
    let prodID = '';
    try {
        prodID = await AsyncStorage.getItem('productID') || 'none';
        console.log("Prod ID: " +prodID)
        this.setState({
            productID: prodID
        })
    }
    catch (error) {
        console.log("error")
    }
    return prodID
  }

  async getProdIMG(){
    let prodIMG = '';
    try {
        prodIMG = await AsyncStorage.getItem('productImage') || 'none';
        console.log("Prod IMG: " +prodIMG)
        this.setState({
            productIMG: prodIMG
        })
    }
    catch (error) {
        console.log("error")
    }
    return prodIMG
  }

componentDidMount(){


this.getProdID().then(() => {
        client.product.fetch(this.state.productID).then((res) => {
            this.setState({
              product: res,
            })
            console.log(this.state.productID)
          })
      })
      this.getProdIMG().then(() =>{
        console.log("prodscreen: " +this.state.productIMG)
      })

     
}



      render(){

        return(
            
            <ProductPage product = {this.state.product} client = {client} image = {this.state.productIMG} />

        )
      }
}