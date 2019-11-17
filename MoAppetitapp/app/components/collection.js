import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';
import {connect} from 'react-redux'

class Col extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false
        }
    }

    render() {
        let Col = this.props.collections.map((collection) => {

            return(
                 <Card key = {collection.id}
                    containerStyle = {{height: 175, width: 175, justifyContent: 'center'}}
                 >
                   <Text>{collection.title}</Text>
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Collection', {Collection: collection})}>
                    {collection.image ? (<Image source={{uri: collection.image.src}} style = {styles.buttonStyle6} />) : (<View style = {styles.buttonStyle6}></View>)}
                    </TouchableOpacity>
                        
                </Card> 
                
            )
        })
        return(
            <View style = {{flex: 1, alignContent:"space-between", justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap"}}>
            {Col}
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
      addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product})
    }
  }

export default connect(null, mapDispatchToProps)(Col)