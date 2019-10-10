import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';

// Added by Mamadou Store Token
// Rendering to the UI the post Registration screen with the login button and informing the user that they need to validate their email
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        auth: '',
      };
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

  render() {
      return (
          <View style={styles.container}>
              <View><Text style={styles.textStyle}>Welcome to the main screen { }</Text></View>
              <View>
                <Button style={{ container: styles.buttonStyle}} text="Get Auth Token" raised={true} primary={true} onPress={ () => this.getValue()}/>
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
  textStyle: {
      color: 'rgba(12, 57, 14, 0.85)',
      alignItems: 'center',
      textAlign: 'center',
  }
});

// END: Added by Mamadou