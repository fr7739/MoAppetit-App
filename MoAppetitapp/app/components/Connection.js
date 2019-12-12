import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import { Card} from 'react-native-elements'
import {connect} from 'react-redux'

// This component displays the collections titles as well their respectives images 
// and once a user clicks on a collection image it will take him/her to the product page
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
                    containerStyle = {{height: 175, width: 175, justifyContent: 'center'}}
                >
                <Card key = {collection.id}
                containerStyle = {{height: 175, width: 175, justifyContent: 'center'}}
                >
                   
                   
                   <Text style = {{color: 'black', fontWeight: 'bold'}}>{collection.title}</Text>
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Collection', {Connection :collection})}>
                    {collection.image ? (<Image source={{uri: collection.image.src}} style = {styles.buttonStyle6} />) : (<View style = {styles.buttonStyle6}></View>)}
                    </TouchableOpacity>
                        
                </Card>
            </View>
            )
        })
        return(

            <ScrollView>
            <View style = {{flex: 1, alignContent:"space-between", justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap", backgroundColor: 'white'}}>  
            {collections}
            </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
      addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product})
    }
  }

export default connect(null, mapDispatchToProps)(Connection)