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

            return(
                <View 
                    key = {index}
                    style = {{flex: 1, padding: 0, margin: 0, justifyContent: 'flex-start', flexDirection: "row", flexWrap: 'wrap', backgroundColor: 'white', position: 'relative'}}
                >
                    <Card
                title = {this.props.collections.title}
                containerStyle = {{height: 45, width: 100, justifyContent: 'center', backgroundColor: "#086522", position: "absolute", marginTop: 2}}
                wrapperStyle = {{padding: 0}}
                ><Text style = {{color: 'white', fontWeight: 'bold'}}>{collection.title}</Text></Card>
                
                <ScrollView
                horizontal = {true}
                showsHorizontalScrollIndicator = {false}
                >
                <Prod products = {collection.products} navigation = {this.props.navigation} client = {this.props.client} />
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