import React from 'react';
import { TextField } from 'react-native-materialui-textfield';
import { StyleSheet, View, ImageBackground,  KeyboardAvoidingView, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles.js';
import {Button} from 'react-native-material-ui';
import passwordAPI from '../hasuraAPI/passwordAPI';



export default class LoginScreen extends React.Component {
    // Added by MAMADOU
    // Initializing state
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            emailError: '',
            isFormValid: false
        };
    }
        
    // Only check this.validateForm() function if any of the states of the fields changed
    componentDidUpdate(_prevProps, prevState) {
        if (
          this.state.email !== prevState.email ||
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

    
 // Handlig change when error is generated from LoginAPI
    setLoginError = error => {
        // If there's an error display that, otherwise send to new screen to tell the user to verify email address and then login
        this.setState({error})
        console.log(this.state)
        if(error === '') {
            this.props.navigation.navigate('Login')
        }
    }

// function to validate that the input is correct
    validateForm = () => {
        console.log(this.state);
        const emails = this.state.email.split('@');
        if (
            emails.length >= 0 &&
            emails[0] &&
            emails[1]
          ) {
            this.setState({ isFormValid: true, emailError: ''});
          } 
        else {
          this.setState({ isFormValid: false });
        }
      };

    // Fucntion to handle the onPress prop for Button when the user tries to register
    handleSubmit = async (name) => {
        let registerResponse = await passwordAPI(this.state) // Calling the register API
        const resultResponse = await registerResponse.json()

        // If the response generated from the API has a status of 200 then add the user to the user table
        if (passwordResponse.status === 200) {
            const userInfo = {
                hasura_id: resultResponse.hasura_id,
                name: name
            }

            // Calling the setUser API
            let setUserResponse = await setUserAPI(userInfo)
            const resultResponseSetUser = await setUserResponse.json()
            if (resultResponseSetUser["affected_rows"]) {
                this.setPasswordError('')
            }
            else {
                this.setPasswordError('Error adding to database') // resultResponseSetUser.message only contains undefined error messages
            }
        }
        else {
            this.setPasswordError(resultResponse.message)
        }
      }


    // Rendering to the UI the input options and submit button
    render() {
        return (
            <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover'   style={styles.backgroundImage} 
            >{/* Thamima: Changes */} 
            <KeyboardAvoidingView style={styles.KBAV} behavior="position" enabled>
                        <View style={styles.container}>
                 
                        <TouchableOpacity style={styles.CircleMoAppetit}>
                        <Text>MoAppetit</Text>
                        </TouchableOpacity>
                        
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
        
          <View>
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
              <Button style={{ container: styles.loginButton}} text="Login" raised={true} primary={true} onPress={ () => this.handleSubmit()}/>
              </TouchableOpacity>
          </View>

        </View>
        </View>
        </KeyboardAvoidingView>
        </ImageBackground>
        )
    }
}