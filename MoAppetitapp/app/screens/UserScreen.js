import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Alert, StyleSheet } from "react-native";
import { TextField } from "react-native-materialui-textfield";
import { Button } from "react-native-material-ui";
import styles from "./styles.js";
import getAddressAPI from "../hasuraAPI/getAddressAPI";
import setAddressAPI from "../hasuraAPI/setAddressAPI";
import getFullUserAPI from "../hasuraAPI/getFullUserAPI";
import deleteAddressAPI from "../hasuraAPI/deleteAddressAPI";
import setUseFullInfoAPI from "../hasuraAPI/setUserFullInfoAPI.js";
import { Header } from "react-native-elements";
import { CardItem, Item, Input, Body, Right, Left, Container, Content, Form } from "native-base";
import { Card } from 'react-native-elements'


import SegmentControl from 'react-native-segment-control';


class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0, //User section
      hasura_id: global.hasura_id, //User section
      name: "", //User section
      config: null, //User section
      phone: null, //User section
      addressline1: "",
      addressline2: "",
      addressline3: "",
      city: "",
      state: "",
      zip: "",
      id: 0,
      user_id: 0,
      editingAddressID: null,
      isInEditMode: false,
      error: ""
    };
    this.addresses = [];

    this.userState = {
      "id:": "0",
      hasura_id: global.hasura_id,
      config: "null",
      name: "",
      phone: "0"
    };
    if (this.loadAddresses()) {
    }
    if (this.loadUserInfo()) {
    }
  }

  ShowDatabaseError() {
    console.trace();
    Alert.alert(
      "Error",
      "Error retreving data from the Database, Check your internet connection",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
    console.trace();
  }

  async loadUserInfo() {
    const passInUserObject = {
      hasura_id: global.hasura_id
    };

    let getFullUserResponse = await getFullUserAPI(passInUserObject);
    if (getFullUserResponse.status != 200) {
      this.ShowDatabaseError();
      return;
    }

    const resultResponseGetFullUser = await getFullUserResponse.json();

    global.User_ID = this.userState.user_id;
    this.userState.user_id = resultResponseGetFullUser[0].id;
    this.userState.hasura_id = resultResponseGetFullUser[0].hasura_id;
    this.userState.config = String(resultResponseGetFullUser[0].config);
    this.userState.name = String(resultResponseGetFullUser[0].name);
    this.userState.phone = String(resultResponseGetFullUser[0].phone);
    this.forceUpdate();
  }
  async loadAddresses() {
    this.addresses = [];
    const addressInfo = {
      user_id: 0
    };

    // Calling the getAddressAPI API
    let getAddressResponse = await getAddressAPI(addressInfo);
    if (getAddressResponse.status != 200) {
      console.log(getAddressResponse.json());
      this.ShowDatabaseError();

      return;
    }
    const resultResponseGetAddress = await getAddressResponse.json();

    for (const key in resultResponseGetAddress) {
      this.addresses.push({
        addressline1: resultResponseGetAddress[key].addressline1,
        addressline2: resultResponseGetAddress[key].addressline2,
        addressline3: resultResponseGetAddress[key].addressline3,
        city: resultResponseGetAddress[key].city,
        state: resultResponseGetAddress[key].state,
        zip: resultResponseGetAddress[key].zip,
        id: resultResponseGetAddress[key].id,
        user_id: resultResponseGetAddress[key].user_id
      });
    }
    this.forceUpdate();
  }

  // Handling change when user enters text
  handleaddressline1Change = addressline1 => {
    this.setState({ addressline1 });
  };
  // Handling change when user enters text into Name field
  handleNameChange = name => {
    this.userState.name = String(name);
  };

  // Handling change when user enters text into Phone field
  handlePhoneChange = phone => {
    this.userState.phone = phone;
  };
  // Handling change when user enters text
  handleaddressline2Change = addressline2 => {
    this.setState({ addressline2 });
  };
  // Handling change when user enters text
  handleaddressline3Change = addressline3 => {
    this.setState({ addressline3 });
  };
  // Handling change when user enters text
  handlecityChange = city => {
    this.setState({ city });
  };

  // Handling change when user enters text
  handlestateChange = state => {
    this.setState({ state });
  };

  // Handling change when user enters text
  handlezipChange = zip => {
    this.setState({ zip });
  };

  // Handlig change when error is generated from API's
  setAddressError = error => {
    // If there's an error display that, otherwise send to new screen to tell the user to verify email address and then login
    this.setState({ error });
    if (this.state.error === "") {
    }
  };

  //Handle the user Submitting new user information
  handleUserSubmit = async userInfo => {
    let UserResponse = await setUseFullInfoAPI(this.userState);
    if (UserResponse.status != 200) {
      this.ShowDatabaseError();
      return;
    }
    const resultUserResponse = await UserResponse.json();
  };

  handleDelete = async value => {
    console.log("Value: " + value);
    // Calling the deleteAddressAPI API
    let deleteAddressResponse = await deleteAddressAPI(value); //pass in value, which is just an ID
    if (deleteAddressResponse.status != 200) {
      this.ShowDatabaseError();
      return;
    }
    this.loadAddresses();
    this.forceUpdate();
  };

  /* push that data for the record selected for edit ti the bottom most edit form and set flags that this data is for an edit*/
  handleEdit = async value => {
    console.log("Value: " + value);
    //Put the data for this record into the bottom form by updating the state
    //to do this find the address in this.addresses
    var add = this.addresses.find(add => add.id === value);
    //update the state using this address
    this.state.phone = add.phone;
    this.state.addressline1 = add.addressline1;
    this.state.addressline2 = add.addressline2;
    this.state.addressline3 = add.addressline3;
    this.state.city = add.city;
    this.state.state = add.state;
    this.state.zip = add.zip;
    this.state.editingAddressID = add.id;
    //set a flag that this address is in edit mode and not insert mode
    this.state.isInEditMode = true;

    this.forceUpdate();
    
  };
  
  /*structures the data, then send the data to the hasura API, 
  then reloads the list of address to see the new record within the list*/
  handleSubmit = async () => {
    if (this.state.addressline1 == "") {
      this.setAddressError("Address Line 1 is required.");
      this.forceUpdate();
      return;
    }

    const addressInfo = {
      address_id: this.state.id,
      addressline1: this.state.addressline1,
      addressline2: this.state.addressline2,
      addressline3: this.state.addressline3,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      user_id: this.state.user_id,
      isInEditMode: this.state.isInEditMode,
      editingAddressID: this.state.editingAddressID
    };

    // Calling the setAddressAPI API in which edit flag is evaluated
    let setAddressResponse = await setAddressAPI(addressInfo);
    if (setAddressResponse.status != 200) {
      this.ShowDatabaseError();
      return;
    }
    const resultResponseSetAddress = await setAddressResponse.json();
    if (resultResponseSetAddress["affected_rows"]) {
      this.setAddressError("");
      console.log("No error");
    } else {
      this.setAddressError("Error adding to database.");
      console.log("Error pulling from the database.");
    }

    this.state.isInEditMode = false; //change the flag back to insert mode,  which will also change the text back to "Add Address"
    this.state.editingAddressID = 0;
    this.state.addressline1 = "";
    this.state.addressline2 = "";
    this.state.addressline3 = "";
    this.state.city = "";
    this.state.state = "";
    this.state.zip = "";
    this.loadAddresses();
    this.state.isInEditMode = false;
    this.forceUpdate();
  };

  //Render All Addresses for the User
  renderAddresses() {
    return this.addresses.map(item => {
      return (
        <View style={styles.AddressBox} key={item.id}>
          <Text style={styles.addressLine}>{item.addressline1}</Text>
          <Text style={styles.addressLine}>{item.addressline2}</Text>
          <Text style={styles.addressLine}>{item.addressline3}</Text>
          <Text style={styles.addressLine}>
            {item.city}, {item.state} {item.zip}
          </Text>

          <View style={styles.AddressButtonContainer}>
            <View style={styles.AddressSingleButtonContainer}>
              <Button
                onPress={() => this.handleDelete(item.id)}
                value={item.id}
                text="Delete"
                style={{ container: styles.buttonStyle2Mini }}
              ></Button>
            </View>
            <View style={styles.AddressSingleButtonContainer}>
              <Button
                onPress={() => {
                  this.handleEdit(item.id);
                  if (this.segmentRef) {
                    this.segmentRef.scrollView.scrollTo({
                      x: 1 * this.segmentRef.state.containerWidth,
                      y: 0,
                      animated: true
                    });
                  }
                }}
                text="Edit"
                style={{ container: styles.buttonStyle2Mini }}
              ></Button>
            </View>
          </View>
        </View>
      );
    });
  }

  segmentRef = null;

  render() {
// Render Edit Profile on one side of userscreen
const One = () => {
        return (
          <View>
        <ScrollView ref="scrollView">
        <Container>
        <Content>
          <Card style={styles.postCard}>
            <View>  
              <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                placeholder="Name"
                value={this.userState["name"]}
                label=""
                onChangeText={this.handleNameChange}
                />
                </Form>

               <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                placeholder="Phone"
                value={this.userState["phone"]}
                label=""
                onChangeText={this.handlePhoneChange}
              />
            </Form>

              <CardItem>
                  <Left></Left>
                  <Body>
            <Button
                onPress={this.handleUserSubmit}
                text="Edit Info"
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
            </ScrollView>
            </View>

            )
          }

// Render Address on one side of userscreen
const Two = () => {
        return (     
          <View>
            <ScrollView ref="scrollView">      
            <Container>
        <Content>
          <Card style={styles.postCard}>
            <View>  
              <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                placeholder="Address Line 1"
                value={this.state.addressline1}
                onChangeText={this.handleaddressline1Change}
                label=""
                />
                </Form>

               <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                placeholder="Address Line 2"
                secureTextEntry={false}
                value={this.state.addressline2}
                onChangeText={this.handleaddressline2Change}
                label=""
                />
                </Form>

                <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                placeholder="Address Line 3"
                secureTextEntry={false}
                value={this.state.addressline3}
                onChangeText={this.handleaddressline3Change}
                label=""
                />
                </Form>

              <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                placeholder="City"
                secureTextEntry={false}
                onChangeText={this.handlecityChange}
                value={this.state.city}
                label=""
                />
                </Form>

              <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                placeholder="State"
                secureTextEntry={false}
                value={this.state.state}
                onChangeText={this.handlestateChange}
                label=""
                />
                </Form>

              <Form style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                placeholder="Zip"
                secureTextEntry={false}
                onChangeText={this.handlezipChange}
                value={this.state.zip}
                label=""
                />
                </Form>

            <CardItem>
                  <Left></Left>
                  <Body>
            <Button
                onPress={this.handleSubmit}
                text={this.state.isInEditMode ? "Save Edit" : "Add Addresss"}
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
          </ScrollView> 
          </View>
    )
        }

        // Render address on one side of userscreen
          const Three = () => {
            return (
              <View>
          <ScrollView>
          <Container>
          <Content>
          <Card style={styles.postCard}>
          <View style={styles.container}>{this.renderAddresses()}</View>
          </Card>
          </Content>
          </Container>
          </ScrollView>
          </View>
            )
          }

const segments = [
            {
              title: 'EDIT PROFILE',
              view: One
            },
            {
              title: 'ADD/EDIT ADDRESS',
              view: Two
            },
            {
                title: 'SAVED ADDRESS',
                view: Three
            },
        ];
  
          return (
            <View style={styles.container3}>
              <SegmentControl segments={segments} ref={(ref) => this.segmentRef = ref} />
            </View>
          );
        };
        
      }
      
        
export default UserScreen;