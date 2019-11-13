import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';
export default class productPage extends Component {
constructor(props){
    super(props)

    this.state ={
    prodIMG: this.props.image,
    updated: false
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

            return(

                <Card
                    title={this.props.product.title}
                    image={{uri: this.state.prodIMG}}>
                    <Text style={{marginBottom: 10}}>
                        {this.props.product.description}
                    </Text>
                        <Button
                            icon={<Icon name='md-cart' color='#ffffff' style = {{padding: 1}} />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='ADD TO CART' />
                </Card> 

            )
        }

        componentDidUpdate(prevProps, prevState, snapshot){
            
        }
    }
