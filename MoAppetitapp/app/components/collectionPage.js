import React, {Component} from 'react';
import { Card, Button } from 'react-native-elements';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Icon, Container } from 'react-native';
import styles from '../screens/styles';


export default class collectionPage extends Component {
constructor(props){
    super(props)

    this.state ={
    }
}

componentWillUpdate(newProps, newState){
    console.log("new props: " +newProps)
    console.log("new State: " +newState)
  }

handleRefresh = () =>{
    if(this.state.updated === true){
      this.setState({
          updated: false
      })
      console.log(this.state.updated)
  }
  else{
      this.setState({
          updated: true
      })
      console.log(this.state.updated)
  }
}
    render(){
        let colProd = this.props.collection.products.map((product) => {
            return(
                <Card key = {product.id}
                   containerStyle = {{height: 175, width: 175, justifyContent: 'center'}}
                >
                   <TouchableOpacity onPress = { () => this.props.navigation.navigate('Product', {Product: product})}>
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
       <ScrollView>
            {colProd}
            </ScrollView>

            )
        }

            
        }