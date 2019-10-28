import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';

export default class productPage extends Component {
constructor(props){
    super(props)

    this.state ={
    prodIMG: this.props.image
    }
}

    render(){

            return(
                <View style = {{flex: 1, borderWidth: 10, backgroundColor: 'white'}}>
                    <View style = {{ flexDirection: 'column'}}>
                        <Text style = {{justifyContent: 'center'}}>{this.props.product.title}</Text>
                        <Image source={this.state.image ? {uri: this.state.image } : null} />
                        <Text>{this.props.product.description}</Text>
                    </View>

                    <View style = {{ flexDirection: 'row', justifyContent: 'center'}}>
 
                    </View>
                </View>

            )
        }
    }
