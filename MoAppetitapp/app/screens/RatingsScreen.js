import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ScrollView,
  Picker,
  Image,
  ImageBackground
} from "react-native";
import { TextField } from "react-native-materialui-textfield";

import { AsyncStorage } from "react-native";
import { Button } from "react-native-material-ui";
import styles from "./styles.js";
import getRatingAPI from "../hasuraAPI/getRatingAPI";
import setRatingAPI from "../hasuraAPI/setRatingAPI";
import getAllProductsAPI from "../hasuraAPI/getAllProductAPI";
import setUserAPI from "../hasuraAPI/setUserAPI";
import getFullUserAPI from "../hasuraAPI/getFullUserAPI";
import setUseFullInfoAPI from "../hasuraAPI/setUserFullInfoAPI.js";

export default class RatingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      hasura_id: global.hasura_id,
      ratingLevel: "",
      ratingDescription: "",
      product_id: ""
    };
    this.allProducts = [];
    this.ratings = [];
    //this.userState  = {"id:":"0","hasura_id": global.hasura_id, "config": "null", "name":"","phone":"0"};
    if (this.loadRatings()) {
    }
    if( this.loadAllProducts())
    {
   }
  }

  async loadAllProducts() {
    //
    this.allProducts = []; 
    while(this.allProducts.length > 0) {
      this.allProducts.pop();
    }
    let getProductsResponse = await getAllProductsAPI(this.state);
  const resultProducts = await getProductsResponse.json();
    for (const key in resultProducts) {
      if(this.allProducts.findIndex( x => x.id == resultProducts[key].id) == -1)
      {
      this.allProducts.push({
        id: resultProducts[key].id,
        name: resultProducts[key].Name
      });
    }
    }
    this.forceUpdate();
  }

  async loadRatings() {
       if(Array.isArray(this.allProducts) && this.allProducts.length  )
     {
      if(this.loadAllProducts())
      {

      }
     }
      
    
    this.ratings = [];
    const ratingsInfo = {
      user_id: 0
    };
    // Calling the getRatingAPI API
    let getRatingResponse = await getRatingAPI(ratingsInfo);
    const resultResponseGetRating = await getRatingResponse.json();
    for (const key in resultResponseGetRating) {
      this.ratings.push({
        user_id: resultResponseGetRating[key].user_id,
        product_id: resultResponseGetRating[key].product_id,
        /*Join*/
        //productName:  this.allProducts.find(function(element) { return element.id == resultResponseGetRating[key].product_id}).name,
        id: resultResponseGetRating[key].id,
        ratingLevel: resultResponseGetRating[key].ratinglevel,
        ratingDescription: resultResponseGetRating[key].ratingDescription
      });
    }
    this.forceUpdate();
  }

  // Handling change when user enters text
  handlerratinglevelChange = (itemValue, itemIndex) => {
    this.setState({ratingLevel: itemValue});
  };

  handleratingDescriptionChange = ratingDescription => {
    this.state.ratingDescription = String(ratingDescription);
  };

  

  handleproduct_idChange = (itemValue, itemIndex) => {
    this.setState({product_id: itemValue});
  };

  handleRatingSubmit = async (userInfo) => {
    let RatingResponse = await setRatingAPI(this.state);
    const resultUserResponse = await RatingResponse.json();

    this.state.ratingLevel = "";
    this.state.ratingDescription = "";
    this.state.product_id = 0;
    this.state.id = 0;
    this.loadRatings();
    this.loadAllProducts();
    this.forceUpdate();
  };

  renderRatings() {
    return this.ratings.map(item => {
      return (
        <View style={styles.container}>
          <Text style={styles.subRatingStyle}>Product {item.productName}</Text>
          <Text style={styles.subRatingStyle}>Rating: {item.ratingLevel}</Text>
          <Text style={styles.subRatingStyle}>
            Description: {item.ratingDescription}
          </Text>
        </View>
      );
    });
  } 

  render() {
    //if(this.loadAllProducts())
    //{

    //}
    
    let productItems = this.allProducts.map((item) => {
      return <Picker.Item key={item.id} value={item.id} label={item.name} />;
    });
    return (
      <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover'style={styles.backgroundImage}>

      <ScrollView>
        
        {/* <View 
        style={styles.existingRatingContainer}>
            <Text style={styles.subPageHeadStyle}>Existing Ratings</Text>
          </View>
          <View style={styles.container}>{this.renderRatings()}</View> */}

          <View style={styles.inputContainer6}>
             
        <Text style={styles.welcome}>
            New Rating
            </Text>
            </View>
          <View style={styles.rectangle8}>
            <View style={styles.RatingsfieldsArea}>
              <TextField
                label = ''
                tintColor="rgba(12, 57, 14, 0.85)"    
                value={this.state["ratingDescription"]}
                placeholder="Description"
                keyboardType="default"
                onChangeText={this.handleratingDescriptionChange}
              />
              <Picker
              label="Rating" 
              mode="dropdown"
              prompt="dialog"
                selectedValue={this.state["ratingLevel"]}
                style={styles.RatingsfieldsAreaPicker}
                tintColor="rgba(12, 57, 14, 0.85)"
                onValueChange={this.handlerratinglevelChange}
                
              >
                <Picker.Item key="1" label="1" value="1" />
                <Picker.Item key="2"  label="2" value="2" />
                <Picker.Item key="3"  label="3" value="3" />
                <Picker.Item key="4"  label="4" value="4" />
                <Picker.Item key="5"  label="5" value="5" />
              </Picker>

              <Picker
              
              prompt="Product"
                label="Product"
                mode="dialog"
                selectedValue={this.state["product_id"]}
                style={styles.RatingsfieldsAreaPicker}
                onValueChange={this.handleproduct_idChange}
                
              >
                <Picker.Item label="None" value="0" />
                {productItems}
              </Picker>

        
            </View>
            <Button
                style={{ container: styles.buttonContainer7 }}
                onPress={this.handleRatingSubmit}
                text="Save Rating"
                raised={true}
                primary={true}
              />
          </View>
        </ScrollView>
        </ImageBackground>
    );
  }
}
