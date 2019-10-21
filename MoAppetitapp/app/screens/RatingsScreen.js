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
import getProductAPI from "../hasuraAPI/getAllProductAPI";
import setUserAPI from "../hasuraAPI/setUserAPI";
import getFullUserAPI from "../hasuraAPI/getFullUserAPI";
import setUseFullInfoAPI from "../hasuraAPI/setUserFullInfoAPI.js";

export default class RatingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: 0,
      hasura_id: global.hasura_id,
      ratingLevel: 0,
      ratingDescription: "",
      product_id: 0
    };
    this.allProducts = [];
    this.ratings = [];
    //this.userState  = {"id:":"0","hasura_id": global.hasura_id, "config": "null", "name":"","phone":"0"};
    if (this.loadRatings()) {
      console.log("hello");
    }
  }

  async loadAllProducts() {
    //
    this.allProducts = []; 

    let getRatingResponse = await getRatingAPI(this.state);
    const resultResponseGetRating = await getRatingResponse.json();
    for (const key in getRatingResponse) {
      this.allProducts.push({
        id: getRatingResponse[key].id,
        name: getRatingResponse[key].name
      });
    }
    this.forceUpdate();
  }

  async loadRatings() {
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
        id: resultResponseGetRating[key].id,
        ratingLevel: resultResponseGetRating[key].ratingLevel,
        ratingDescription: resultResponseGetRating[key].ratingDescription
      });
    }
    this.forceUpdate();
  }

  // Handling change when user enters text
  handlerratinglevelChange = ratinglevel => {
    this.setState({ ratinglevel });
  };

  handleratingDescriptionChange = ratingDescription => {
    this.state.ratingDescription = String(ratingDescription);
  };

  handleproduct_idChange = product_id => {
    this.state.product_id = product_id;
  };

  handleRatingSubmit = async userInfo => {
    console.log("Trying to Submit User");
    let RatingResponse = await setRatingAPI(this.state);
    const resultUserResponse = await RatingResponse.json();
    console.log("Response number was: " + RatingResponse.status);

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
    let productItems = this.allProducts.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    console.log("Count of ratings: " + this.ratings.length);
    return (
      <ImageBackground
        source={require("../assets/OpeningPageBackground.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <ScrollView>
        <View style={styles.existingRatingContainer}>
            <Text style={styles.subPageHeadStyle}>Existing Ratings</Text>
          </View>
          <View style={styles.container}>{this.renderRatings()}</View>
        </ScrollView>

        <ScrollView>
          <View style={styles.editRatingContainer}>
            <View>
              <Text style={styles.subPageHeadStyle}>New Rating</Text>
            </View>
            <View style={styles.RatingsfieldsArea}>
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                
                value={this.state["ratingDescription"]}
                label="Description"
                onChangeText={this.handleratingDescriptionChange}
              />
              <Picker
              label="Rating"
              mode="dropdown"
              prompt="dialog"
                selectedValue={this.state.ratingLevel}
                style={styles.RatingsfieldsAreaPicker}
                tintColor="rgba(12, 57, 14, 0.85)"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ ratingLevel: itemValue })
                }
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                {productItems}
              </Picker>

              <Picker
              
              prompt="Product"
                label="Product"
                mode="dialog"
                selectedValue={this.state.product_id}
                style={styles.RatingsfieldsAreaPicker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ product_id: itemValue })
                }
              >
                <Picker.Item label="None" value="0" />

                <Picker.Item label="sdfsdf" value="0" />

                <Picker.Item label="sdfsdf" value="0" />
                <Picker.Item label="sdfsdf" value="0" />
                {productItems}
              </Picker>

        
            </View>
            <Button
                style={{ container: styles.buttonStyle2 }}
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
