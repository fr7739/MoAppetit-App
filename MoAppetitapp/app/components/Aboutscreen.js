// Aboutscreen.js
import React, { Component } from 'react';
import styles from '../screens/styles';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image, Text} from 'react-native';

export default class Aboutscreen extends Component {
  render() {
    return (
      <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover'style={styles.backgroundImage}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>About Screen</Text>
      </View>
      </ImageBackground>
    )
  }
}