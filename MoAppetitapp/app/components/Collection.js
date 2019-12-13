import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
                // This component is used to seperate the products into their individual collections.
                <View 
                    key = {index}
                    style = {{flex: 1,  flexDirection: "row", flexWrap: 'wrap',}}
                >
                    {/* This decides the position, and appearance of the collection labels */}
                    <TouchableOpacity style = {{position: 'absolute', zIndex: 2000, padding: 20}} 
                    onPress = { () => this.props.navigation.navigate('Collection', {Connection :collection})}>
                        <Text style = {{color: '#086522', fontWeight: 'bold'}}>{collection.title}</Text>
                    </TouchableOpacity>
                
                {/* The prod component is called to display the products held within the collection */}
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


export default Collection

//Jordan Dickerson