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
      user_id: 0,
      hasura_id: 0,
      ratingLevel: "",
      ratingDescription: "",
      product_id: 0,
      product_name: this.props.navigation.getParam('rateMe')
    };

  }
  /** Clears all products entries in memory, request the products from the hasura API, 
   * Then places them into the AllProducts array while preventing duplicates. */


  ShowDatabaseError() {
    Alert.alert(
      "Error",
      "Error retreving data from the Database, Check your internet connection Source: rating page",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  /**: First this function, loads all products if none exist because they 
   * need to display there names for ratings. The function then clears out 
   * the rating array and populated them from a request sent to the hasura API.*/

  // Handling change when user enters text
  handlerratinglevelChange = (itemValue, itemIndex) => {
    console.log("Rating itemValue: " + itemValue);
    this.setState({ ratingLevel: itemValue });
  };

  /**Handle changes to the Rating description */
  handleratingDescriptionChange = ratingDescription => {
    this.state.ratingDescription = String(ratingDescription);
  };

  /*Takes the bound rating data within the form and sends it to the hasura API code section 
   for parsing and submission, then once sent to hasura Clears out the form to prepare for
   another submission*/
  handleRatingSubmit = async userInfo => {
    let RatingResponse = await setRatingAPI(this.state); //Sends the inputed information to the hasura api
    if (RatingResponse.status != 200) {
      console.log(RatingResponse)
      console.log(this.state)
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
    this.forceUpdate(); //Force the page to rerender with the changes
    this.props.navigation.goBack();
  };

  /**Rendered the ratings called withing the main rende           r */
  

  //Render means draw on screen, this is on all screens, and is called by default.
  render() {
    return (
      <ImageBackground
        source={require("../assets/OpeningPageBackground.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
       <Header transparent
          backgroundColor = "#086522"
          leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
         />
        <ScrollView>
             
        <Text style={styles.welcome}>
            New Rating
            </Text>
          <View style={styles.rectangle8}>
            <View style={styles.RatingsfieldsArea}>
            <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                disabled
                label = {this.state.product_name}
                value={this.state["product_name"]}
                placeholder={this.state.product_name}
                keyboardType="default"
                onChangeText={this.handleratingDescriptionChange}
              />
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

              {console.log(this.state["product_name"])}
              {console.log(this.state["ratingLevel"])}
              {console.log(this.state["ratingDescription"])}
            </View>
            <Button
              style={{ container: styles.quickpls }}
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
