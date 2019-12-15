import React from "react";
import { View, Text, ScrollView, Picker, Alert, ImageBackground} from "react-native";
import { TextField } from "react-native-materialui-textfield";
import { Button } from "react-native-material-ui";
import styles from "./styles.js";
import setRatingAPI from "../../app/API/hasuraAPI/setRatingAPI";
import { Header } from 'react-native-elements';
import { Icon, CardItem, Item, Input, Textarea, Form, Body, Right, Left, Container, Content } from 'native-base';
import { Card } from 'react-native-elements'



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
       <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover'style={styles.backgroundImage}>
          <Header transparent
          centerComponent = {<Text style = {{color: 'white', fontWeight: 'bold', fontSize: 18}}>Rating</Text>}
          backgroundColor = "#086522"
          leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
         />

        <Container>
        <Content>
          <Card style={styles.postCard}>
            <View>
              <CardItem>
              <Item>
              <Input
                tintColor="rgba(12, 57, 14, 0.85)"
                disabled
                label = {this.state.product_name}
                value={this.state["product_name"]}
                placeholder={this.state.product_name}
                keyboardType="default"
                onChangeText={this.handleratingDescriptionChange}
                />
                </Item>
              </CardItem>
              <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                rowSpan={5}
                bordered
                placeholder="Type your description"
                value={this.state["ratingDescription"]}
                placeholder="Description"
                label=" "
                keyboardType="default"
                onChangeText={this.handleratingDescriptionChange}
                />
                </Form>

              <Picker
                label="Rating"
                mode="dropdown"
                prompt="dialog"
                selectedValue={this.state["ratingLevel"]}
                style={styles.RatingsfieldsAreaPicker}
                tintColor="rgba(12, 57, 14, 0.85)"
                onValueChange={this.handlerratinglevelChange}
              >
                <Picker.Item key="1" label="Terrible" value="1" />
                <Picker.Item key="2" label="Bad" value="2" />
                <Picker.Item key="3" label="Okay" value="3" />
                <Picker.Item key="4" label="Good" value="4" />
                <Picker.Item key="5" label="Great" value="5" />
              </Picker>

              {console.log(this.state["product_name"])}
              {console.log(this.state["ratingLevel"])}
              {console.log(this.state["ratingDescription"])}
            
              <CardItem>
                  <Left></Left>
                  <Body>
            <Button
              onPress={this.handleRatingSubmit}
              text="Submit"
              raised={true}
              primary={true}
            >
                    </Button>
                  </Body>
                  <Right></Right>
                </CardItem>
            </View>
            </Card>
        </Content>
      </Container>
        </ImageBackground>
    );
  }
}