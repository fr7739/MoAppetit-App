import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import { Header } from 'react-native-elements';
import { Icon } from 'native-base';


export default class CartScreen extends React.Component {
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
        
        <Header transparent
        leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.navigate('Main')} />}
       />
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