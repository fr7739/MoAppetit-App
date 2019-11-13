import React from "react";
import { View, Text, ScrollView, ImageBackground, Alert } from "react-native";
import { TextField } from "react-native-materialui-textfield";
import { Button } from "react-native-material-ui";
import styles from "./styles.js";
import getAddressAPI from "../hasuraAPI/getAddressAPI";
import setAddressAPI from "../hasuraAPI/setAddressAPI";
import getFullUserAPI from "../hasuraAPI/getFullUserAPI";
import setUseFullInfoAPI from "../hasuraAPI/setUserFullInfoAPI.js";
import { Header } from 'react-native-elements';
import { Icon } from 'native-base';


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
    console.log("this.state: " + JSON.stringify(this.userState));
  }
  async loadAddresses() {
    this.addresses = [];
    const addressInfo = {
      user_id: 0
    };

    // Calling the getAddressAPI API
    let getAddressResponse = await getAddressAPI(addressInfo);
    if (getAddressResponse.status != 200) {
      console.log(jasongetAddressResponse.json());
      console.log("Statttttttttttus is " + getAddressResponse.status)
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

  /*structures the data, then send the data to the hasura API, 
  then reloads the list of address to see the new record within the list*/
  handleSubmit = async name => {
    if (this.state.addressline1 == "") {
      this.setAddressError("Address Line 1 is required.");
      this.forceUpdate();
      return;
    }
    let AddressResponse = await setAddressAPI(this.state);
    if (AddressResponse.status != 200) {
      this.ShowDatabaseError();
      return;
    }
    if (AddressResponse.status === 200) {
      this.setAddressError("Got bad response from server.");
    }
    const resultResponse = await AddressResponse.json();

    const addressInfo = {
      address_id: resultResponse.id,
      addressline1: resultResponse.addressline1,
      addressline2: resultResponse.addressline2,
      addressline3: resultResponse.addressline3,
      city: resultResponse.city,
      state: resultResponse.state,
      zip: resultResponse.zip,
      user_id: resultResponse.user_id
    };

    // Calling the setAddressAPI API
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
      this.setAddressError("Error adding to database");
      console.log("Error pulling from the  database");
    }

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
        <View style={styles.container} key={item.id}>
          <Text style={styles.subPageHeadStyle}>
            Address Line 1: {item.addressline1}
          </Text>
          <Text style={styles.subPageHeadStyle}>
            Address Line 2: {item.addressline2}
          </Text>
          <Text style={styles.subPageHeadStyle}>
            Address Line 3: {item.addressline3}
          </Text>
          <Text style={styles.subPageHeadStyle}>City: {item.city}</Text>
          <Text style={styles.subPageHeadStyle}>State: {item.state}</Text>
          <Text style={styles.subPageHeadStyle}>Zip: {item.zip}</Text>
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
        <Header transparent
          backgroundColor = "#086522"
          leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
         />
        <ScrollView>
          <View style={styles.container}>{this.renderAddresses()}</View>
        </ScrollView>
        <ScrollView>
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
                text="Add Addresss"
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
