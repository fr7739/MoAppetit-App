import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from './styles.js';

export default class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        auth: '',
      };
    }


  render() {
      return (
        <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover'style={styles.backgroundImage}>

        <ScrollView>
          <View style={styles.container}>
              <View><Text style={styles.subPageHeadStyle}>User Info</Text></View>
              <View>
               <Text style ={styles.longText}>
              Is this the real one? no
                </Text>
            </View>
          </View>
          </ScrollView>
          </ImageBackground>
      );
  }
}
