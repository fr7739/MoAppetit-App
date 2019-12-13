import React from 'react';
import { View, ImageBackground,  KeyboardAvoidingView, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles.js';
import {Button} from 'react-native-material-ui';
import passwordAPI from '../API/hasuraAPI/passwordAPI';
import { Form, TextValidator } from 'react-native-validator-form';




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
        this.refs.form.submit()

        // If the response generated from the API has a status of 200 then add the user to the user table
        if (passwordResponse.status === 200) {
          this.refs.form.submit()
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
      const { email } = this.state
        return (
          <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover'style={styles.backgroundImage}>
          <KeyboardAvoidingView style={styles.KBAV} behavior="position" enabled>
   
          <View style={styles.inputContainer2}>
          <Text style={styles.welcome}>
            Forgot your password?
            <Text style={styles.welcome2}>
            We'll send you a link to reset your password
            </Text>
            </Text>
       </View>

       <Form
        ref="form"
        onSubmit={this.handleSubmit}
            >

       <View style={styles.rectangle3}>
       <View style={styles.inputContainer}>
       <TextValidator  
          name="email"
          label="email"
          validators={['required', 'isEmail']}
          errorMessages={['This field is required', 'Email invalid']}
          value= {email}
          onChangeText={this.handleEmailChange}
          placeholder="Email"
          //keyboardType="email-address"
          underlineColorAndroid='transparent'/>
          </View>
          <View>
          <TouchableOpacity style={[styles.buttonContainer4]}>
              <Button style={{container: styles.buttonContainer4}} text="Submit" raised={true} primary={true} onPress={ () => this.handleSubmit()}/>
              </TouchableOpacity>
          </View>
      </View>
      </Form>
      </KeyboardAvoidingView>
      </ImageBackground>
      )
  }
    }