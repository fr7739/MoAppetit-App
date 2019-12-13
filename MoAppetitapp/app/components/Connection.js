import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import { Card } from 'react-native-elements'



class Connection extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false,
        }
    }

    render() {
        //Maps all of the collections that are pulled from Shopify and readies them to be rendered
        let collections = this.props.collections.map((collection, index) => {
            let title = collection.title
            return(
                <View 
                    key = {index}
                    containerStyle = {{height: 175, width: 175, justifyContent: 'center'}}
                >
                {/* This decides the appearance of the individual cards that make up the Collection Screen */}
                <Card key = {collection.id}
                containerStyle = {{height: 175, width: 175, justifyContent: 'center'}}
                >
                   <Text style = {{color: 'black', fontWeight: 'bold'}}>{collection.title}</Text>
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Collection', {Connection :collection})}>
                    {collection.image ? (<Image source={{uri: collection.image.src}} style = {styles.buttonStyle6} />) : (<View style = {styles.buttonStyle6}></View>)}
                    </TouchableOpacity>  
                </Card>
                {/* Card Appearance end */}
            </View>
            )
        })
        return(
            // This decides the layout of the various cards that make up the Collection Screen
            <ScrollView>
            <View style = {{flex: 1, alignContent:"space-between", justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap", backgroundColor: 'white'}}>  
            {collections}
            </View>
            </ScrollView>
            // Collection Layout End
        )
    }
}

export default Connection