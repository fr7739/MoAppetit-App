import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../screens/styles'
import {AsyncStorage} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon, Container } from 'native-base';
import {connect} from 'react-redux'
import Collection from './Collection';
import getRatingAPI from "../hasuraAPI/getRatingAPI";

export default class Reviews extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false,
        }
        this.ratings = [];
        if (this.loadRatings()) {
        }
    }

    loadRatings = async () => {
    
        this.ratings = [];
        const ratingsInfo = {
          user_id: 1
        };
        // Calling the getRatingAPI API
        let getRatingResponse = await getRatingAPI(ratingsInfo);
        if (getRatingResponse.status != 200) {
          this.ShowDatabaseError();
          return;
        }
        const resultResponseGetRating = await getRatingResponse.json();
        for (const key in resultResponseGetRating) {
          this.ratings.push({
            user_id: resultResponseGetRating[key].user_id,
            product_id: resultResponseGetRating[key].product_id,
            /*Join*/
            product_name: resultResponseGetRating[key].product_name,
            id: resultResponseGetRating[key].id,
            ratingLevel: resultResponseGetRating[key].ratinglevel,
            ratingDescription: resultResponseGetRating[key].ratingDescription
          });
        }
        this.forceUpdate(); //Force the page to rerender with the changes
      }

    render() {
        
           return(
           <View>{console.log(this.ratings)}</View>

           )
        // return(
        //     <View style = {{flex: 1, justifyContent: 'flex-start', flexDirection: "row", flexWrap: "wrap", backgroundColor: 'white', padding: 0, margin: 0, marginTop: 3, marginBottom: 3, paddingRight: 1, borderWidth: 0, minWidth: 500}}>
        //     {products}
        //     </View>
        // )
    }
}
