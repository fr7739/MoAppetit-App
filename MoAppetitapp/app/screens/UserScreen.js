import React from 'react';
import { StyleSheet, View,  FlatList, Text, ScrollView, Image, ImageBackground} from 'react-native';
import { TextField } from 'react-native-materialui-textfield';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from './styles.js';
import getAddressAPI from '../hasuraAPI/getAddressAPI';
import setAddressAPI from '../hasuraAPI/setAddressAPI';

export default class UserScreen extends React.Component {
   constructor(props) {
    super(props);



    this.state = {
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
 if( this.loadAddresses())
 {
   console.log("hello");
 }
  }


  async  loadAddresses() {
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
  }

   renderAddresses() {

    /*
    const addressInfo = {
      user_id: 0
    }

    //asdasdasdasdas
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
    console.log
    */
   


    return (this.addresses.map( (item) => {
      // console.log("ff Item: "+ item);
      
        return (
            <View style={styles.container}>
              
              <Text style={styles.subPageHeadStyle}> {item.addressline1}</Text>
              <Text style={styles.subPageHeadStyle}> {item.addressline2}</Text>
              <Text style={styles.subPageHeadStyle}> {item.addressline3}</Text>
              <Text style={styles.subPageHeadStyle}> {item.city}</Text>
              <Text style={styles.subPageHeadStyle}> {item.state}</Text>
              <Text style={styles.subPageHeadStyle}> {item.zip}</Text>
           
              
              </View>
        );
    })
    
    );
}


renderf(){
  return ( <Text style={styles.subPageHeadStyle}> sdfsdfsdfsdfsdf</Text>
      );
  };


  render() {
    //this.loadAddresses();
console.log("Mark!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
console.log("Count of addresses: " + this.addresses.length);
      return (


        <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover' style={styles.backgroundImage}>

          <ScrollView>
          <View style={styles.container}>
             <Text style={styles.subPageHeadStyle}>Addresses will go here.</Text>
             {this.renderAddresses()}
             {this.renderf()}
             </View>
          </ScrollView>


        <ScrollView>
          <View style={styles.container}>
              <View><Text style={styles.subPageHeadStyle}>User Info</Text></View>
               <View style={styles.fieldsArea2}>
                    <TextField tintColor='rgba(12, 57, 14, 0.85)'
                    required
                    value= {this.state.addressline1}
                    onChangeText={this.handleaddressline1Change}
                    label="Address Line 1"
                    />
                    <TextField tintColor='rgba(12, 57, 14, 0.85)'
                    required
                    secureTextEntry={false}
                    value= {this.state.addressline2}
                    onChangeText={this.handleaddressline2Change}
                    label="Address Line 2"
                    />
                    
                    <TextField tintColor='rgba(12, 57, 14, 0.85)'
                    required
                    secureTextEntry={false}
                    value= {this.state.addressline3}
                    onChangeText={this.handleaddressline3Change}
                    label="Address Line 3"
                    />      
                    <TextField tintColor='rgba(12, 57, 14, 0.85)'
                    required
                    secureTextEntry={false}
                    onChangeText={this.handlecityChange}
                    value= {this.state.city}
                    label="City"
                    />   
                    <TextField tintColor='rgba(12, 57, 14, 0.85)'
                    required
                    secureTextEntry={false}
                    value= {this.state.state} 
                    onChangeText={this.handlestateChange}
                    label="State"
                    />
                    <TextField tintColor='rgba(12, 57, 14, 0.85)'
                    required
                    secureTextEntry={false} 
                    onChangeText={this.handlezipChange}
                    value= {this.state.zip}
                    label="Zip"
                    />
            </View>
            <View>
              <Button style={{ container: styles.buttonStyle2}} onPress={this.handleSubmit} text="Add Addresss" raised={true} primary={true} />
              </View>
        </View>
        </ScrollView>
        </ImageBackground>
      );
  }
}
