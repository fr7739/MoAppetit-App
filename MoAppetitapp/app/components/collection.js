import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { client } from '../hasuraAPI/shopifyAPI';
import { Icon, Container } from 'native-base';
import { Header } from 'react-native-elements';
import {connect} from 'react-redux'






class Col extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false,
            collections: [],
        }
   }

   componentWillMount(){
       client.collection.fetchAllWithProducts().then((res) => {
         this.setState({
           collections: res,
         })
       })
     }

    setValue = async (key, data) => {
        try {
        await AsyncStorage.setItem(key, data);
         console.log("Set Value:" +data)
        } catch (e) {
            console.log("Error e" + e)
        }
    }


    async removeItemValue(key) {
        try {
          await AsyncStorage.removeItem(key);
          return true;
        }
        catch(exception) {
          return false;
        }
      }

    render() {
        let col = this.state.collections.map((collection) => {

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
            <View>
            <Header transparent
            leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
            rightComponent={<Icon name="md-cart" onPress={() => this.props.navigation.navigate('cart')} />}
           />
            <ScrollView>
            <View style = {{flex: 1, alignContent:"space-between", justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap"}}>
            {col}
            </View>
            </ScrollView>
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