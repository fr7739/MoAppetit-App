import React from "react";
import { View, Text, ScrollView, Picker, Alert, ImageBackground } from "react-native";
import { TextField } from "react-native-materialui-textfield";

import { Button } from "react-native-material-ui";
import styles from "./styles.js";
import getRatingAPI from "../hasuraAPI/getRatingAPI";
import setRatingAPI from "../hasuraAPI/setRatingAPI";
import getAllProductsAPI from "../hasuraAPI/getAllProductAPI";
import { Header } from 'react-native-elements';
import { Icon } from 'native-base';
import { Card } from 'react-native-elements'
import CartIcon from '../containers/cartIcon'



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

    if (this.loadRatings()) {
    }
    if (this.loadAllProducts()) {
      console.log("Products Loaded");
    }
  }
  /** Clears all products entries in memory, request the products from the hasura API, 
   * Then places them into the AllProducts array while preventing duplicates. */
  async loadAllProducts() {
    this.allProducts = []; //Clear out products and start fresh
    while (this.allProducts.length > 0) {
      this.allProducts.pop();
    }
    let getProductsResponse = await getAllProductsAPI(this.state);
    if (getProductsResponse.status != 200) {
      this.ShowDatabaseError();
      return;
    }
    const resultProducts = await getProductsResponse.json();
    for (const key in resultProducts) {
      if (
        this.allProducts.findIndex(x => x.id == resultProducts[key].id) == -1
      ) {
        //Not insert duplicates
        this.allProducts.push({
          id: resultProducts[key].id,
          name: resultProducts[key].Name
        });
      }
    }
    this.forceUpdate(); //Force the page to rerender with the changes
  }

  ShowDatabaseError() {
    Alert.alert(
      "Error",
      "Error retreving data from the Database, Check your internet connection",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  /**: First this function, loads all products if none exist because they 
   * need to display there names for ratings. The function then clears out 
   * the rating array and populated them from a request sent to the hasura API.*/
  async loadRatings() {
    if (Array.isArray(this.allProducts) && this.allProducts.length) {
      if (this.loadAllProducts()) {
      }
    }

    this.ratings = [];
    const ratingsInfo = {
      user_id: 0
    };
    // Calling the getRatingAPI API
    let getRatingResponse = await getRatingAPI(ratingsInfo);
    if (getRatingResponse.status != 200) {
      this.ShowDatabaseError();
      return;
    }
    const resultResponseGetRating = await getRatingResponse.json();
    for (const key in resultResponseGetRating) {
      var product = this.allProducts.find(function(element) {
        return element.id == resultResponseGetRating[key].product_id;
      });
      var foundproductname = "Product Not found";
      if (product != null)
        //handle Error from record corruption in database
        foundproductname = product.name;
      else {
        console.log(
          "Product Id not found: " + resultResponseGetRating[key].product_id
        );
      }
      this.ratings.push({
        user_id: resultResponseGetRating[key].user_id,
        product_id: resultResponseGetRating[key].product_id,
        /*Join*/
        productName: foundproductname,
        id: resultResponseGetRating[key].id,
        ratingLevel: resultResponseGetRating[key].ratinglevel,
        ratingDescription: resultResponseGetRating[key].ratingDescription
      });
    }
    this.forceUpdate(); //Force the page to rerender with the changes
  }

  // Handling change when user enters text
  handlerratinglevelChange = (itemValue, itemIndex) => {
    console.log("Rating itemValue: " + itemValue);
    this.setState({ ratingLevel: itemValue });
  };

  /**Handle changes to the Rating description */
  handleratingDescriptionChange = ratingDescription => {
    this.state.ratingDescription = String(ratingDescription);
  };

  handleproduct_idChange = (itemValue, itemIndex) => {
    console.log("itemValue: " + itemValue);
    this.setState({ product_id: itemValue });
  };

  /*Takes the bound rating data within the form and sends it to the hasura API code section 
   for parsing and submission, then once sent to hasura Clears out the form to prepare for
   another submission*/
  handleRatingSubmit = async userInfo => {
    let RatingResponse = await setRatingAPI(this.state); //Sends the inputed information to the hasura api
    if (RatingResponse.status != 200) {
      this.ShowDatabaseError();
      return;
    }
    const resultUserResponse = await RatingResponse.json();
    //Clears out all the inputed information so that another rating can be entered
    this.state.ratingLevel = "";
    this.state.ratingDescription = "";
    this.state.product_id = 0;
    this.state.id = 0;
    //Reload the list to get the list with the added information
    this.loadRatings();
    this.loadAllProducts();
    this.forceUpdate(); //Force the page to rerender with the changes
  };

  /**Rendered the ratings called withing the main render */
  renderRatings() {
    var i = 0;
    return this.ratings.map(item => {
      return (
        <Card key={item.id} title={item.productName}>
        {
        <View style={styles.user}>
          <Text>{"Rating: " +item.ratingLevel}</Text>
          <Text>{"Review: " +item.ratingDescription}</Text>
        </View>
        }
        </Card>
      //   <View key={item.id} style={styles.container}>
      //     <Text style={styles.subRatingStyle}>Product {item.productName}</Text>
      //     <Text style={styles.subRatingStyle}>Rating: {item.ratingLevel}</Text>
      //     <Text style={styles.subRatingStyle}>
      //       Description: {item.ratingDescription}
      //     </Text>
      //   </View>
      // );
    )
      })
      i = i+1
}

  //Render means draw on screen, this is on all screens, and is called by default.
  render() {
    let productItems = this.allProducts.map(item => {
      return <Picker.Item key={item.id} value={item.id} label={item.name} />;
    });
    return (
      <ImageBackground
        source={require("../assets/OpeningPageBackground.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
       <Header transparent
          centerComponent = {<Text style = {{color: 'white', fontWeight: 'bold', fontSize: 18}}>Ratings</Text>}
          backgroundColor = "#086522"
          leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
         />
        <ScrollView>
          <View style={styles.existingRatingContainer}>
            <Text style={styles.subPageHeadStyle}>Existing Ratings</Text>
          </View>
          <View style={styles.container}>{this.renderRatings()}</View> 

          <View style={styles.inputContainer6}>
             
        <Text style={styles.welcome}>
            New Rating
            </Text>
            </View>
          <View style={styles.rectangle8}>
            <View style={styles.RatingsfieldsArea}>
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                label = "desc"
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
                <Picker.Item key="2" label="2" value="2" />
                <Picker.Item key="3" label="3" value="3" />
                <Picker.Item key="4" label="4" value="4" />
                <Picker.Item key="5" label="5" value="5" />
              </Picker>

              <Picker
                prompt="Product"
                label="Product"
                mode="dialog"
                selectedValue={this.state["product_id"]}
                style={styles.RatingsfieldsAreaPicker}
                onValueChange={this.handleproduct_idChange}
              >
                <Picker.Item label="Picker" value="0" />
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
