import React from "react";
import { View, Text, ScrollView, ImageBackground, Alert } from "react-native";
import { TextField } from "react-native-materialui-textfield";
import { Button } from "react-native-material-ui";
import styles from "./styles.js";
import getAddressAPI from "../hasuraAPI/getAddressAPI";
import setAddressAPI from "../hasuraAPI/setAddressAPI";
import getFullUserAPI from "../hasuraAPI/getFullUserAPI";
import deleteAddressAPI from "../hasuraAPI/deleteAddressAPI";
import setUseFullInfoAPI from "../hasuraAPI/setUserFullInfoAPI.js";
import { Header } from "react-native-elements";
import { Icon } from "native-base";

export default class UserScreen extends React.Component {
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
    this.refs.scrollView.scrollTo({ x: 999, y: 999, animated: true }); // Scroll to the bottom to show that the Address is in edit mode
    //x is an arbitrarily large number
    //y is an arbitrarily large number
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
                onPress={() => this.handleEdit(item.id)}
                text="Edit"
                style={{ container: styles.buttonStyle2Mini }}
              ></Button>
            </View>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/OpeningPageBackground.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Header
          transparent
          backgroundColor="#086522"
          leftComponent={
            <Icon
              name="menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
        />
        <ScrollView>
          <View style={styles.container}>{this.renderAddresses()}</View>
        </ScrollView>
        <ScrollView ref="scrollView">
          <View style={styles.container}>
            <View>
              <Text style={styles.subPageHeadStyle}>User Info</Text>
            </View>
            <View style={styles.fieldsArea2}>
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                value={this.userState["name"]}
                label="Name"
                onChangeText={this.handleNameChange}
              />
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                value={this.userState["phone"]}
                label="Phone"
                onChangeText={this.handlePhoneChange}
              />
            </View>

            <View>
              <Button
                style={{ container: styles.buttonStyle2 }}
                onPress={this.handleUserSubmit}
                text="Edit Info"
                raised={true}
                primary={true}
              />
            </View>
            <View>
              <Text style={styles.subPageHeadStyle}>Add Address</Text>
            </View>
            <View style={styles.fieldsArea2}>
              <Text id="errorText">{this.state.error}</Text>
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                value={this.state.addressline1}
                onChangeText={this.handleaddressline1Change}
                label="Address Line 1"
              />
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                secureTextEntry={false}
                value={this.state.addressline2}
                onChangeText={this.handleaddressline2Change}
                label="Address Line 2"
              />

              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                secureTextEntry={false}
                value={this.state.addressline3}
                onChangeText={this.handleaddressline3Change}
                label="Address Line 3"
              />
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                secureTextEntry={false}
                onChangeText={this.handlecityChange}
                value={this.state.city}
                label="City"
              />
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                secureTextEntry={false}
                value={this.state.state}
                onChangeText={this.handlestateChange}
                label="State"
              />
              <TextField
                tintColor="rgba(12, 57, 14, 0.85)"
                required
                secureTextEntry={false}
                onChangeText={this.handlezipChange}
                value={this.state.zip}
                label="Zip"
              />
            </View>
            <View>
              <Button
                style={{ container: styles.buttonStyle2 }}

                onPress={this.handleSubmit}
                text={this.state.isInEditMode ? "Save Edit" : "Add Addresss"}

                onPress={() => this.handleSubmit()}
                text="Add Address"
                raised={true}
                primary={true}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
