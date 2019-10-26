import React from 'react';
import { StyleSheet, View,  FlatList, Text, ScrollView, Image, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import { TextField } from 'react-native-materialui-textfield';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from './styles.js';
import getAddressAPI from '../hasuraAPI/getAddressAPI';
import setAddressAPI from '../hasuraAPI/setAddressAPI';
import setUserAPI from '../hasuraAPI/setUserAPI';
import getFullUserAPI from "../hasuraAPI/getFullUserAPI"
import setUseFullInfoAPI from '../hasuraAPI/setUserFullInfoAPI.js';

export default class UserScreen extends React.Component {
   constructor(props) {
    super(props);


    this.state = {
      user_id: 0,  //USer section
      hasura_id: global.hasura_id,  //USer section
      name: "",  //USer section
      config: null,  //USer section
      phone: null,  //USer section
      addressline1: '',
      addressline2: '',
      addressline3: '',
      city: '',
      state: '',
      zip: '',
      id: 0,
      user_id: 0,
      error: '',
   
  };
//maybe
 this.addresses = [];
 this.userState  = {"id:":"0","hasura_id": global.hasura_id, "config": "null", "name":"","phone":"0"};
 if( this.loadAddresses())
 {
   console.log("hello");
 }
 if( this.loadUserInfo())
 {
   console.log("hello");
 }
  }

  async  loadUserInfo() {
    const passInUserObject = {
      hasura_id: global.hasura_id 
    }

    let getFullUserResponse = await getFullUserAPI(passInUserObject);
   // console.log("ab1212");
    //console.log("After ab: " + JSON.stringify(getFullUserResponse));
    const resultResponseGetFullUser = await getFullUserResponse.json();
    
    console.log("AAAAAAAAPPPPPP: " + JSON.stringify(resultResponseGetFullUser));
    console.log("cd34343");
    console.log("find me 123: " + resultResponseGetFullUser);
    //for (const key in getFullUserResponse) {
      
    global.User_ID = this.userState.user_id;
    this.userState.user_id = resultResponseGetFullUser[0].id;
    this.userState.hasura_id = resultResponseGetFullUser[0].hasura_id;
    this.userState.config = String(resultResponseGetFullUser[0].config);
    this.userState.name = String(resultResponseGetFullUser[0].name);
    this.userState.phone = String(resultResponseGetFullUser[0].phone);
    //}
    this.forceUpdate();
  
    console.log("this.state: " + JSON.stringify(this.userState));
  }
  async  loadAddresses() {
    this.addresses = [];
      const addressInfo = {
        user_id: 0 
      }
  
      // Calling the getAddressAPI API
      let getAddressResponse = await getAddressAPI(addressInfo);
      const resultResponseGetAddress = await getAddressResponse.json();
      console.log("AAAAAAAAPPPPPP: " + JSON.stringify(resultResponseGetAddress));
      for (const key in resultResponseGetAddress) {
         
          //console.log("ooo: "+ JSON.stringify(resultResponseGetAddress[key]));
          console.log("addressline1: " + resultResponseGetAddress[key].addressline1);
        this.addresses.push ({
          addressline1 :  resultResponseGetAddress[key].addressline1,
          addressline2 :  resultResponseGetAddress[key].addressline2,
          addressline3 :  resultResponseGetAddress[key].addressline3,
          city: resultResponseGetAddress[key].city,
          state: resultResponseGetAddress[key].state,
          zip: resultResponseGetAddress[key].zip,
          id: resultResponseGetAddress[key].id,
          user_id: resultResponseGetAddress[key].user_id
        
        });
  
      
      }
      this.forceUpdate();
      //console.log("ADDresses");
      //console.log(this.addresses);
      //for(var key in resultResponseGetAddress) { 
     //   console.log("one: " + JSON.stringify(key)); 
     // }
  
  
     // if (resultResponseGetAddress["affected_rows"]) {
         // this.GetAddressError('')
         // console.log("No error");
      //}
     // else {
      //    this.GetAddressError('Error pulling from the database') ;
      //    console.log("Error adding to database");
     // }
    //    console.log(resultResponseGetAddress.message) ;
    // this.GetAddressError(resultResponseGetAddress.message);
  
    }
  

handleLoad = async (name) => {
  //   const addressInfo = {
  //     user_id: 0
  //   }

  //   // Calling the getAddressAPI API
  //   let getAddressResponse = await getAddressAPI(addressInfo);
  //   const resultResponseGetAddress = await getAddressResponse.json();
  //   console.log("AAAAAAAAPPPPPP: " + JSON.stringify(resultResponseGetAddress));
  //   for (const key in resultResponseGetAddress) {
       
  //       //console.log("ooo: "+ JSON.stringify(resultResponseGetAddress[key]));
  //       console.log("addressline1: " + resultResponseGetAddress[key].addressline1);
  //     this.addresses.push ({
  //       addressline1 :  resultResponseGetAddress[key].addressline1,
  //       addressline2 :  resultResponseGetAddress[key].addressline2,
  //       addressline3 :  resultResponseGetAddress[key].addressline3,
  //       city: resultResponseGetAddress[key].city,
  //       state: resultResponseGetAddress[key].state,
  //       zip: resultResponseGetAddress[key].zip,
  //       id: resultResponseGetAddress[key].id,
  //       user_id: resultResponseGetAddress[key].user_id
      
  //     });

    
  //   }
  //   console.log("ADDresses");
  //   console.log(this.addresses);
  //   //for(var key in resultResponseGetAddress) { 
  //  //   console.log("one: " + JSON.stringify(key)); 
  //  // }


  //  // if (resultResponseGetAddress["affected_rows"]) {
  //      // this.GetAddressError('')
  //      // console.log("No error");
  //   //}
  //  // else {
  //   //    this.GetAddressError('Error pulling from the database') ;
  //   //    console.log("Error adding to database");
  //  // }
  //     console.log(resultResponseGetAddress.message) ;
   // this.GetAddressError(resultResponseGetAddress.message);

  }

    // Handling change when user enters text
    handleaddressline1Change = addressline1 => {
     this.setState({addressline1})
 }



 handleNameChange = name => {
   this.userState.name = String(name);
 }


 handlePhoneChange = phone => {
  this.userState.phone = phone;
}
 // Handling change when user enters text
 handleaddressline2Change = addressline2 => {
  this.setState({addressline2})
}
// Handling change when user enters text
handleaddressline3Change = addressline3 => {
 this.setState({addressline3})
}
// Handling change when user enters text
handlecityChange = city => {
 this.setState({city})
}

// Handling change when user enters text
handlestateChange = state => {
  this.setState({state})
 }

 
// Handling change when user enters text
handlezipChange = zip => {
  this.setState({zip})
 }

     // Handlig change when error is generated from API's
     setAddressError = error => {
      // If there's an error display that, otherwise send to new screen to tell the user to verify email address and then login
      this.setState({error})
      if(this.state.error === '') {
          //this.props.navigation.navigate('somewhere')
      }
  }

handleUserSubmit = async(userInfo) =>{
  console.log("Trying to Submit User");
  let UserResponse = await setUseFullInfoAPI(this.userState) ;
  const resultUserResponse = await UserResponse.json();
  console.log("Response number was: "+UserResponse.status);
  /*const user_info = {
    id: data.id,
    hasura_id: resultUserResponse.hasura_id,
    name: resultUserResponse.name,
    config: resultUserResponse.config,
    phone: resultUserResponse.phone
  }*/
/*
  let setAddressResponse = await setAddressAPI(addressInfo)
        const resultResponseSetAddress = await setAddressResponse.json()
        if (resultResponseSetAddress["affected_rows"]) {
            this.setAddressError('')
            console.log("No error");
        }
        else {
            this.setAddressError('Error adding to database') ;
            console.log("Error pulling from the  database");
        }

*/
        


}
  
  


  handleSubmit = async (name) => {
    console.log("Trying to Submit");
    let AddressResponse = await setAddressAPI(this.state) ;
    const resultResponse = await AddressResponse.json();
    console.log("Response number was: "+AddressResponse.status);
    if (AddressResponse.status === 200) {
      this.setAddressError("Got bad response from server.");

    }
    // If the response generated from the API has a status of 200 then add the user to the user table
   // if (AddressResponse.status === 200) {
        const addressInfo = {
          address_id: resultResponse.id,
          addressline1: (resultResponse.addressline1),
          addressline2: (resultResponse.addressline2),
          addressline3: (resultResponse.addressline3),
          city: (resultResponse.city),
          state: (resultResponse.state),
          zip: (resultResponse.zip),
          user_id: (resultResponse.user_id)
        }

        // Calling the setAddressAPI API
        let setAddressResponse = await setAddressAPI(addressInfo)
        const resultResponseSetAddress = await setAddressResponse.json()
        if (resultResponseSetAddress["affected_rows"]) {
            this.setAddressError('')
            console.log("No error");
        }
        else {
            this.setAddressError('Error adding to database') ;
            console.log("Error pulling from the  database");
        }
   // }
   // else {
      
     // console.log(resultResponse.message) ;
       // this.setAddressError(resultResponse.message)
    //}
    
    this.state.addressline1 = "";
    this.state.addressline2 = "";
    this.state.addressline3 = "";
    this.state.city = "";
    this.state.state = "";
    this.state.zip = "";
    this.loadAddresses();
    this.forceUpdate();
  }

   renderAddresses() {




    return (this.addresses.map( (item) => {
      // console.log("ff Item: "+ item);
      
        return (
            <View style={styles.container}>
              
              <Text style={styles.subPageHeadStyle}>Address Line 1:  {item.addressline1}</Text>
              <Text style={styles.subPageHeadStyle}>Address Line 2:  {item.addressline2}</Text>
              <Text style={styles.subPageHeadStyle}>Address Line 3:  {item.addressline3}</Text>
              <Text style={styles.subPageHeadStyle}>City:  {item.city}</Text>
              <Text style={styles.subPageHeadStyle}>State:  {item.state}</Text>
              <Text style={styles.subPageHeadStyle}>Zip: {item.zip}</Text>
           
              
              </View>
        );
    })
    
    );
}


renderf(){
  return ( <Text style={styles.subPageHeadStyle}></Text>
      );
  };


  render() {
    //this.loadAddresses();
console.log("Mark!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
console.log("Count of addresses: " + this.addresses.length);
      return (


        <ScrollView>

          <ScrollView>
          <View 
          style={styles.container}>
             {this.renderAddresses()}
             {this.renderf()}
             </View>
          </ScrollView>


        <ScrollView>
        <View style={styles.inputContainer4}>
             
        <Text style={styles.welcome}>
            User Info
            </Text>
            </View>

          <View style={styles.rectangle5}>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}          
          required
          value= {this.userState["name"]}
          label="Name"
          onChangeText={this.handleNameChange}
          />
          </View>
              


          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
          required
          secureTextEntry={true}
          value= {this.userState["phone"]}
          onChangeText={this.handlePhoneChange}
          />
          </View>
              


              
              <View>
          <TouchableOpacity style={[styles.buttonContainer6]}></TouchableOpacity>
              <Button style={{ container: styles.buttonContainer6}} onPress={this.handleUserSubmit} text="Edit Info" raised={true} primary={true} />
              </View>
                </View>

          <View style={styles.inputContainer4}>
          <Text style={styles.welcome}>
            Add Address
            </Text>
            </View>
              
          <View style={styles.rectangle6}>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs} 
            required
            value= {this.state.addressline1}            
            onChangeText={this.handleaddressline1Change}
            placeholder="Address Line 1"
            keyboardType="default"
            underlineColorAndroid='transparent'/>
            </View>


            <View style={styles.inputContainer}>      
            <TextInput style={styles.inputs} 
            required
            value= {this.state.addressline2}            
            onChangeText={this.handleaddressline2Change}
            placeholder="Address Line 2"
            keyboardType="default"
            underlineColorAndroid='transparent'/>
            </View>


             <View style={styles.inputContainer}>        
            <TextInput style={styles.inputs} 
            required
            value= {this.state.addressline3}            
            onChangeText={this.handleaddressline3Change}
            placeholder="Address Line 3"
            keyboardType="default"
            underlineColorAndroid='transparent'/>
            </View>     
                    
                    
            <View style={styles.inputContainer}>        
            <TextInput style={styles.inputs} 
            required
            secureTextEntry={false}
            onChangeText={this.handlecityChange}
            value= {this.state.city}
            placeholder="City"
            keyboardType="default"
            underlineColorAndroid='transparent'/>
            </View> 
                      

            <View style={styles.inputContainer}>        
            <TextInput style={styles.inputs} 
            required
            secureTextEntry={false}
            value= {this.state.state} 
            onChangeText={this.handlestateChange}
            placeholder="State"
            keyboardType="default"
            underlineColorAndroid='transparent'/>
            </View>



            <View style={styles.inputContainer}>        
            <TextInput style={styles.inputs} 
            required
            secureTextEntry={false}
            value= {this.state.zip} 
            onChangeText={this.handlezipChange}
            placeholder="Zip"
            keyboardType="default"
            underlineColorAndroid='transparent'/>
            </View>
            
            <View>
            <TouchableOpacity style={[styles.buttonContainer5]}>
              <Button style={{ container: styles.buttonContainer5}} onPress={this.handleSubmit} text="Submit" raised={true} primary={true} />
              </TouchableOpacity>
              </View>
              
              </View>

        </ScrollView>
        </ScrollView>

      );
  }
}
