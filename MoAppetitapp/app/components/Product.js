import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';

class Prod extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false
        }
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
        let products = this.props.products.map((product) => {

            return(

                <Card key = {product.id.toString()}
                    title={product.title}>
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate('Product', {IMG: product.images[0].src, title: product.title, desc: product.description, ID: product.id})}>
                    <Image source={{uri: product.images[0].src}} style = {styles.buttonStyle6} />
                    </TouchableOpacity>
                        <Button
                            icon={<Icon name='md-cart' color='#ffffff' style = {{padding: 1}} />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
                        title={product.variants[0].price} />
                </Card>

            )
        })
        return(
            <View style = {{flex: 2, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <ScrollView>
            {products}
            </ScrollView>
            </View>
        )
    }
}


export default Prod