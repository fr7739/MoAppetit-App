import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button } from 'react-native-material-ui';

// Added by Salwa
// Rendering to the UI the Login and Register buttons
export default class InitialScreen extends React.Component {
  render() {
      return (
          <View style={styles.container}>
              <Button 
              style={{ container: styles.buttonStyle}} 
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
      );
  }
}

// Style Container
const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
      width: 100,
      height: 40,
      backgroundColor: 'rgba(12, 57, 14, 0.69)',
  },
});

// END: Added by Salwa
