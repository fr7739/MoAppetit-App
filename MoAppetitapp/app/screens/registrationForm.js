import React from 'react';
import { StyleSheet, View, ImageBackground, Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-material-ui';
import { TextField } from 'react-native-materialui-textfield';
import registerAPI from '../hasuraAPI/registerAPI';
import setUserAPI from '../hasuraAPI/setUserAPI';
import { resultKeyNameFromField } from 'apollo-utilities';
import styles from './styles.js';


// Added by Salwa
export default class RegistrationForm extends React.Component {
    // Initializing state
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            error: '',
            emailError: '',
            passwordLengthError: '',
            passwordConfirmError: '',
            isFormValid: false,
            isUserRegistered: false,
        };
    }

    // Only check this.validateForm() function if any of the states of the fields changed
    componentDidUpdate(prevProps, prevState) {
        if (
          this.state.name !== prevState.name ||
          this.state.email !== prevState.email ||
          this.state.password !== prevState.password ||
          this.state.password2 !== prevState.password2 ||
          this.state.emailError !== prevState.emailError ||
          this.state.passwordLengthError !== prevState.passwordLengthError ||
          this.state.passwordConfirmError !== prevState.passwordConfirmError
        ) {
          this.validateForm();
        }
      }

    // Handling change when user enters text for name 
    handleNameChange = name => {
        this.setState({name})
    }

    // Checkin if email is valid using a regular expression
    emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      }

    // Handling change when user enters text for email and verifying that email is correct
    handleEmailChange = email => {
        this.setState({email})
        if (this.emailIsValid(email)) {
            this.setState({emailError: ''})
        }
        else {
            this.setState({emailError: 'Invalid Email'})
        }
    }

    // Handling change when user enters text for password and verifying that password length is correct
    handlePasswordChange = password => {
        this.setState({password})
        if (password.length < 8) {
            this.setState({passwordLengthError: 'Password must be at least 8 characters'})
        }
        else {
            this.setState({passwordLengthError: ''})
        }
    }

    // Handling change when user enters text for confirmation password and verifying that it's the same as the previous password
    handlePassword2Change = password2 => {
        this.setState({password2})
        if (password2 !== this.state.password) {
            this.setState({passwordConfirmError: 'Passwords must match'})
        }
        else {
            this.setState({passwordConfirmError: ''})
        }
    }

    // Handlig change when error is generated from API's
    setRegisterError = error => {
        // If there's an error display that, otherwise send to new screen to tell the user to verify email address and then login
        this.setState({error})
        if(this.state.error === '') {
            this.props.navigation.navigate('PostRegister')
        }
    }

    // Function to validate that the input is correct
    validateForm = () => {
        const emails = this.state.email.split('@');
        if (
            this.state.password === this.state.password2 &&
            this.state.password.length > 0 &&
            this.state.password2.length > 0 && 
            emails.length >= 2 &&
            emails[0] &&
            emails[1]
          ) {
            this.setState({ isFormValid: true, emailError: '', passwordLengthError: '', passwordConfirmError: '' });
          } 
        else {
          this.setState({ isFormValid: false });
        }
      };

      // Fucntion to handle the onPress prop for Button when the user tries to register
      handleSubmit = async (name) => {
        let registerResponse = await registerAPI(this.state) // Calling the register API
        const resultResponse = await registerResponse.json()

        // If the response generated from the API has a status of 200 then add the user to the user table
        if (registerResponse.status === 200) {
            const userInfo = {
                hasura_id: resultResponse.hasura_id,
                name: name
            }

            // Calling the setUser API
            let setUserResponse = await setUserAPI(userInfo)
            const resultResponseSetUser = await setUserResponse.json()
            if (resultResponseSetUser["affected_rows"]) {
                this.setRegisterError('')
            }
            else {
                this.setRegisterError('Error adding to database') // resultResponseSetUser.message only contains undefined error messages
            }
        }
        else {
            this.setRegisterError(resultResponse.message)
        }
      }


    // Rendering to the UI the input options and submit button
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
            text="Register" 
            raised={true} 
            onPress={() => this.props.navigation.navigate('Register')}/>
     </View>
     </View>

            <View style={styles.rectangle}>
            <View style={styles.inputContainer}>
            <TextInput style={styles.inputs} 
            required
            value= {this.state.name}
            onChangeText={this.handleNameChange}
            placeholder="Name"
            keyboardType="Name"
            underlineColorAndroid='transparent'/>
            </View>
                        

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
        

          <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
          required
          secureTextEntry={true}
            value= {this.state.password2}
            onChangeText={this.handlePassword2Change}
            placeholder="Confirm Password"
            underlineColorAndroid='transparent'/>
            </View>
        <View>
        <TouchableOpacity style={[styles.buttonContainer3]}>
              <Button style={{ container: styles.buttonContainer3}} onPress={this.handleSubmit} text="Register" raised={true} primary={true} />
              </TouchableOpacity>

              </View>

              </View>
 
        </KeyboardAvoidingView>
        </ImageBackground>
        )
    }
}

// Style container


  // END: Added by Salwa