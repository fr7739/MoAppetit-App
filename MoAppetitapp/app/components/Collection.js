import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';
import {connect} from 'react-redux'
import Prod from '../components/Product'

class Collection extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false
        }
    }

    render() {
        let collections = this.props.collections.map((collection, index) => {
                let title = collection.title
            return(
                <View 
                    key = {index}
                    style = {{flex: 1,  flexDirection: "row", flexWrap: 'wrap',}}
                >

                    <Text style = {{color: '#086522', fontWeight: 'bold', position: 'absolute', zIndex: 2000, padding: 20}}>{collection.title}</Text>

                
                <ScrollView
                horizontal = {true}
                showsHorizontalScrollIndicator = {false}
                style = {{padding: 5, margin: 0}}
                >
                <Prod products = {collection.products} navigation = {this.props.navigation} client = {this.props.client} collection = {collection.title} />
                </ScrollView>
                </View>
            )
        })
        return(
            <View>  
            {collections}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
      addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product})
    }
  }

export default connect(null, mapDispatchToProps)(Collection)