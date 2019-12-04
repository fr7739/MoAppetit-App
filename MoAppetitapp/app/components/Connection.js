import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';
import {connect} from 'react-redux'


class Connection extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false,
        }
    }

    render() {

        let collections = this.props.collections.map((collection, index) => {
            let title = collection.title
            return(
                <View 
                    key = {index}
                    style = {{flex: 1, padding: 0, margin: 0, justifyContent: 'flex-start', flexDirection: "row", flexWrap: 'wrap', backgroundColor: 'black', position: 'relative'}}
                >
                <Card key = {collection.id}
                style={{borderRadius: 50, borderWidth: 2,height: 35, width: 35, flexDirection: "row", position: "absolute", padding: 4, right: 1, left: 1, top: 1}}>
                   
                   
                   <Text style = {{color: 'black', fontWeight: 'bold'}}>{collection.title}</Text>
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Collections', {Connection :collection})}>
                    {collection.image ? (<Image source={{uri: collection.image.src}} style = {styles.buttonStyle6} />) : (<View style = {styles.buttonStyle6}></View>)}
                    </TouchableOpacity>
                        
                </Card>

{/* <ScrollView
// horizontal = {true}
// showsHorizontalScrollIndicator = {false}
>
<Prod products = {collection.products} navigation = {this.props.navigation} client = {this.props.client} collection = {collection.title} />
</ScrollView> */}
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

export default connect(null, mapDispatchToProps)(Connection)