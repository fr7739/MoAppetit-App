import React from 'react';
import { View, KeyboardAvoidingView, Image, Text, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-material-ui';

import styles from './styles.js';

import { Icon } from 'native-base';
import facebooklogIn from '../hasuraAPI/facebookAPI';

import { Card} from 'react-native-elements';




// Added by Salwa
// Rendering to the UI the Login and Register buttons
export default class InitialScreen extends React.Component {

  setLoginError = error => {
    // If there's an error display that, otherwise send to new screen to tell the user to verify email address and then login
    this.setState({error})
    console.log(this.state)
    if(error === '') {
        this.props.navigation.navigate('Main')
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

  render() {
      return (
        <KeyboardAvoidingView style={styles.KBAV} behavior="position" enabled>
        
        <View style={styles.container}>
        <Text style={styles.welcome}>
      Create an account to start
    </Text>

        

<Card>
  <Image 
  source={require('../assets/HeaderImage.png')}
  style={{
    height: 135,
    width: 400,

  }}
/>
  
</Card>

        
        
        <View>
        <TouchableOpacity style={[styles.buttonContainer2]}>
            <Button style={{ container: styles.loginButton2}} text="Continue with Email" raised={true} primary={true} onPress={ () => this.props.navigation.navigate('Register')}/>
            </TouchableOpacity>
        </View>

        <Text numberOfLines={1}>               
    __________________________ or __________________________
        </Text>

        <View>
        <TouchableOpacity style={[styles.buttonContainer2]}>
        <View style={styles.socialButtonContent2}>
          <Image style={styles.icon} source={{uri: 'https://png.icons8.com/facebook/androidL/40/FFFFFF'}}/>
          <Button style={{ container: styles.fabookButton2}} text="Continue with Facebook" raised={true} primary={true} onPress={ () => this.handleSubmitFacebook()}/>
        </View>
      </TouchableOpacity>
        </View>

    <View style = {styles.signupTextCont}>
    <Text style = {styles.signupText}> Already have an account? </Text>
    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}> 
    <Text style = {styles.signupButton}> Sign in </Text> 
    </TouchableOpacity>
    </View>
    </View>     

    </KeyboardAvoidingView>
    )
}

}

// END: Added by Salwa
