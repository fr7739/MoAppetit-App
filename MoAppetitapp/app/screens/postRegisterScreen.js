import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-material-ui';

// Added by Salwa
// Rendering to the UI the post Registration screen with the login button and informing the user that they need to validate their email
export default class postRegisterScreen extends React.Component {
  render() {
      return (
          <View style={styles.container}>
              <View><Text >Verify Email Address and then Login</Text></View>
              <View>
                <Button 
                style={{ container: styles.buttonStyle}} 
                primary={true} 
                text="Login" 
                raised={true} 
                onPress={() => this.props.navigation.navigate('Login')}/>
              </View>
          </View>
      );
  }
}

// Style Container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
      width: 100,
      height: 40,
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
  },
  textStyle: {
      color: 'rgba(12, 57, 14, 0.85)',
      alignItems: 'center',
      textAlign: 'center',
  }
});

// END: Added by Salwa
