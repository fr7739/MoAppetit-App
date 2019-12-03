import React from 'react';
import { StyleSheet, View, ImageBackground,  KeyboardAvoidingView, Image, Text, TouchableOpacity,TextInput} from 'react-native';
import {Button} from 'react-native-material-ui';
import { TextField } from 'react-native-materialui-textfield';
import loginAPI from '../hasuraAPI/loginAPI';
import googleAPI from '../hasuraAPI/googleAPI';
import * as Facebook from 'expo-facebook';
import facebooklogIn from '../hasuraAPI/facebookAPI';
import { initAsync } from 'expo-google-sign-in';
import {AsyncStorage} from 'react-native';
import styles from './styles.js';

import { Icon } from 'native-base';





// Added by Salwa

export default class LoginScreen extends React.Component {
    // Added by MAMADOU
    // Initializing state
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            emailError: '',
            passwordLengthError: '',
            isFormValid: false
        };
    }
        
    // Only check this.validateForm() function if any of the states of the fields changed
    componentDidUpdate(_prevProps, prevState) {
        if (
          this.state.email !== prevState.email ||
          this.state.password !== prevState.password ||
          this.state.emailError !== prevState.emailError
          ) {
          this.validateForm();
        }
      }

      emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      }
    // Handling change when user enters text for email
    handleEmailChange = email => {
        this.setState({email})
        if (this.emailIsValid(email)) {
            this.setState({emailError: ''})
        }
        else {
            this.setState({emailError: 'Invalid Email'})
        }
    }

    // Handling change when user enters text for password
    handlePasswordChange = password => {
        this.setState({password})
        if (password.length < 8) {
            this.setState({passwordLengthError: 'Password must be at least 8 characters'})
        }
        else {
            this.setState({passwordLengthError: ''})
        }
    }
    
 // Handlig change when error is generated from LoginAPI
    setLoginError = error => {
        // If there's an error display that, otherwise send to new screen to tell the user to verify email address and then login
        this.setState({error})
        console.log(this.state)
        if(error === '') {
            this.props.navigation.navigate('Main')
        }
    }

// function to validate that the input is correct
    validateForm = () => {
        console.log(this.state);
        const emails = this.state.email.split('@');
        if (
            this.state.password.length > 0 &&
            emails.length >= 2 &&
            emails[0] &&
            emails[1]
          ) {
            this.setState({ isFormValid: true, emailError: '', passwordLengthError: ''});
          } 
        else {
          this.setState({ isFormValid: false });
        }
      };
  
    handleSubmit = async () => {
        let loginResponse = await loginAPI(this.state)
        const loginResult = await loginResponse.json()
        console.log(loginResult)
        if(loginResponse.status !== 200) {
            console.log(loginResult.message)
            this.setLoginError(loginResult.message)
        }
        else {
            console.log("Auth Token: " +loginResult.auth_token)
            global.hasura_id =  loginResult.hasura_id;
            console.log("All login result: "+loginResult);
            await AsyncStorage.setItem('token', loginResult.auth_token);
            this.setLoginError('')
        }
      }

      handleSubmitFacebook = async () => {
        let loginResponse2 = await facebooklogIn()
        // const loginResult2 = await loginResponse2.json()
        // console.log(loginResult2)
        // if(loginResponse.status !== 200) {
        //     console.log(loginResult2.message)
        //     this.setLoginError(loginResult2.message)
        // }
        // else {
            // console.log("Auth Token: " +loginResponse2.token)
            // await AsyncStorage.setItem('token', loginResponse2.token);
            this.setLoginError('')
        }
      
      
    // Added By Mamadou Store Token
    setValue = async () => {
        try {
          await AsyncStorage.setItem('token', loginResult.auth_token);
          console.log("set Value run:" +auth)
        } catch (e) {
            console.log("setVAlue: " +loginResult.auth_token)
        }
      }

    getValue = async () => {
        try {
          const auth = await AsyncStorage.getItem('token');
            console.log("Token: " +auth)
        }
        catch (error) {
            console.log("error")
        }
      }
    //Store Token End

    // Rendering to the UI the Input options and form button
    render() {
      return (
          <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover'style={styles.backgroundImage}>
              {/* Thamima: Changes */} 
          <KeyboardAvoidingView style={styles.KBAV} behavior="position" enabled>
          <View style={styles.container}>
          
          <Text style={styles.CircleMoAppetit}>"MoAppetit"</Text>
          <View style={styles.buttonHolder}>
                <Button 
              style={{ container: styles.buttonStyleDown}} 
              primary={true} 
              text="Login" 
              raised={true}  
              onPress={() => this.props.navigation.navigate('Login')}/>
              <Button 
              style={{ container: styles.buttonStyle}} 
              primary={true} 
              text="Sign Up" 
              raised={true} 
              onPress={() => this.props.navigation.navigate('Register')}/>
       </View>
       </View>

       <View style={styles.rectangle2}>
       <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}          
          required
          value= {this.state.email}
          onChangeText={this.handleEmailChange}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid='transparent'/>
          </View>

          <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
          required
          secureTextEntry={true}
          value= {this.state.password}
          onChangeText={this.handlePasswordChange}
          placeholder="Password"
          underlineColorAndroid='transparent'/>
          </View>
        
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Password')}> 
      <View>
      <Text style = {styles.signupButton2}> Forgot Password? </Text> 
      </View>
      </TouchableOpacity> 

          <View>
          <TouchableOpacity style={[styles.buttonContainer4]}>
              <Button style={{container: styles.buttonContainer4}} text="Login" raised={true} primary={true} onPress={ () => this.handleSubmit()}/>
              </TouchableOpacity>
          </View>
      </View>
      </KeyboardAvoidingView>
      </ImageBackground>
      )
  }
 
}