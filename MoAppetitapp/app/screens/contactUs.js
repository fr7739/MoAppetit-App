import React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from './styles.js';

export default class ContactUsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        auth: '',
      };
    }


  render() {
      return (
        <ScrollView>
          <View style={styles.container}>
              <View><Text style={styles.subPageHeadStyle}>Contact US</Text></View>
              <View>
               <Text style ={styles.longText}>


                </Text>
            </View>
          </View>
          </ScrollView>
      );
  }
}
