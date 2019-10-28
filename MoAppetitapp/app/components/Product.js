import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';


class Prod extends Component {

    setValue = async (key, data) => {
        try {
        await AsyncStorage.setItem(key, data);
         console.log("Set Value:" +data)
        } catch (e) {
            console.log("Error e" + e)
        }
    }

    handleProductPage(key, data, key2, data2){
        this.setValue(key, data)
        this.setValue(key2, data2)
       

        this.props.navigation.navigate('Product');
    }

    render() {
        let products = this.props.products.map((product) => {

            return(
                <View key = {product.id.toString()} style = {{borderWidth: 2, backgroundColor: 'white'}}>
                    <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress = { () => this.handleProductPage('productID', product.id.toString(), 'productImage', product.images[0].src)}>
                        <Image source={{uri: product.images[0].src}} style = {styles.buttonStyle6} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Text>{product.title}</Text>
                    </View>
                    
                    <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Text>Price: {product.variants[0].price}</Text>
                    </View>
                </View>

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