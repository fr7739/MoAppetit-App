  
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from './styles.js';
import { Header } from 'react-native-elements';
import { Icon } from 'native-base';

import { Card} from 'react-native-elements';


export default class AboutUsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: ""
    };
  }

  render() {
      return (
        <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover'style={styles.backgroundImage}>
          <Header transparent
          centerComponent = {<Text style = {{color: 'white', fontWeight: 'bold', fontSize: 18}}>About Us</Text>}
          backgroundColor = "#086522"
          leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
         />
        

        


 <View style={styles.inputContainer3}>
         
 <Text style={styles.welcome3}>
            I remember my mom’s weary face while running errands, she would go from preparing breakfast, to dropping us off to school, to doing the laundry, to washing the dishes, to cleaning the mess we caused in every corner of the house, to buying the groceries, cooking us food, go through our homework, and finally putting us to sleep..
              The very last thought on my mind every night was: “My mother is a super mom”.
 
              I grew up to know that my mother is like many mothers around the world who run around with tens of tasks on their back, and unfortunately most of them don’t have time for themselves.
 
              At Xmart we will always have time for you .. Take time for yourself, and we’ll take some tasks off your shoulders. 
 
              Time is Precious and so are you.
 
              We value Time and We Value you.
            
            </Text>

       </View>
          {/* </ScrollView> */}
          
      </ImageBackground>

      );
  }
}