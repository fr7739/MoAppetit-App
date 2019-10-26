import React from 'react';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image, Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from '../screens/styles';
import { Icon, Container } from 'native-base';
import { Header } from 'react-native-elements';
import { client } from '../hasuraAPI/shopifyAPI';
import Prod from '../components/Product';

import { Card} from 'react-native-elements';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';  





let prod = 

    client.product.fetchAll().then( products => {
    // Do something with the product
    console.log(products[0]);
    console.log("This is hopefully a product name: " +products[0].title+ " and description: " +products[0].description)
    return products[0].title;
  }).catch(e => {
      console.log('Caught error: ' +e)
  });  

  let prod2 = 

    client.product.fetchAll().then( products => {
    // Do something with the product
    return products[0].description;
  }).catch(e => {
      console.log('Caught error: ' +e)
  });  

  let prod3 = 

    client.product.fetchAll().then( products => {
    // Do something with the product
    return products[1].title;
  }).catch(e => {
      console.log('Caught error: ' +e)
  });  

  let prod4 = 

    client.product.fetchAll().then( products => {
    // Do something with the product
    return products[1].description;
  }).catch(e => {
      console.log('Caught error: ' +e)
  });  
// Added by Mamadou Store Token
// Rendering to the UI the post Registration screen with the login button and informing the user that they need to validate their email
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        auth: '',
        products: [],
      };
    }
    
    componentWillMount(){
      client.product.fetchAll().then((res) => {
        this.setState({
          products: res,
        })
      })
      }

switchToContactUs = async() =>
{
   this.props.navigation.navigate('ContactUs');
}


switchToAboutUs = async() =>
{
  this.props.navigation.navigate('AboutUs');
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

        <Container>

                <Header transparent
                    leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                    rightComponent={<Icon name="md-cart" onPress={() => this.props.navigation.navigate('cart')} />}
                   />
                     <View style={styles.container}>
   
                <Card>
          <Image 
          Header transparent
          leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
          rightComponent={<Icon name="md-cart" onPress={() => this.props.navigation.navigate('cart')} />}

          source={require('../assets/HeaderImage.png')}
          style={{
            height: 195,
            width: 400,
        
          }}
        />
          
        </Card>
        </View>
                   
              <Prod products = {this.state.products} client = {client} />
              </Container>

      );
  }
}

// Style Container
/* const styles = StyleSheet.create({
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
}); */

// END: Added by Mamadou