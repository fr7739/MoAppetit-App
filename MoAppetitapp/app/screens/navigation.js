import React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer';
import{ createAppContainer, createSwitchNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import MainScreen from './mainScreen';
import ContactUs from '../screens/contactUs';
import AboutUs from '../screens/aboutUs';
import UserScreen from "../screens/UserScreen";
import RatingsScreen from "../screens/RatingsScreen"
import RegisterScreen from './registrationForm';
import PostRegisterScreen from './postRegisterScreen';
import LoginScreen from './loginForm';
import PasswordScreen from './passwordForm';
import CartScreen from './cartScreen';
import initialScreen from './initialScreen';
import productScreen from './productScreen'
import CartIcon from '../containers/cartIcon'
import productPage from '../components/productPage'
import Col from '../screens/Col';
import CollectionScreen from './collectionScreen';

import { createStackNavigator, StackNavigator } from 'react-navigation-stack';


export default class navigation extends React.Component {
  render() {
    return <AppContainer />;
  }
}

class Hidden extends React.Component {
  render() {
    return null;
  }
}
//This drawer navigator decides which screens appear in the side drawer.
const drawNav = createDrawerNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      drawerIcon: () => (
        <Image
          source={require('../assets/home3.png')}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
      )
    }
  },

  Ratings:{
    screen: RatingsScreen,
    navigationOptions: {
      drawerIcon: () => (
        <Image
          source={require('../assets/star-empty.png')}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
      )
    }
  },

  'User Info':{
  screen: UserScreen,
  navigationOptions: {
    drawerIcon: () => (
      <Image
        source={require('../assets/user.png')}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
    )
  }
  },

  'About Us': {
    screen: AboutUs,
    navigationOptions: {
      drawerIcon: () => (
        <Image
          source={require('../assets/newspaper.png')}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
      )
    }
  },

  Cart: {
    screen: CartScreen,
    navigationOptions: {
      drawerIcon: () => (
        <Image
          source={require('../../assets/icon-cart.png')}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
      )
    }
  },

  Collections: {
    screen: Col,
    navigationOptions: {
      drawerIcon: () => (
        <Image
          source={require('../assets/grocery.png')}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
      )
    }
  },

  

})

//This is the general stack navigator for the app that allows the back button and navigation functions to work. 
//The back button can be used to take one back to the main screen
const AppNavigator = createStackNavigator({

drawNavigator: drawNav,
Main: MainScreen,
Ratings: RatingsScreen,
Product: productScreen,
'User Info': UserScreen,
'About Us':AboutUs,
Cart: CartScreen,
CartIcon: CartIcon,
Collection: CollectionScreen,
Col: Col,
ProductPage: productPage
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   });

//This is the stack navigator that encompasses the login process, the back button can be used to take you back to the initial screen
const authNavigator = createStackNavigator({

    Initial: {
      screen: initialScreen,
    },
    Register:{
      screen: RegisterScreen
    },
    Login:{
    screen: LoginScreen
    },
    PostRegister: {
      screen: PostRegisterScreen
    },
    
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  //Allows one to switch between navigation stacks. This prevents the back button from taking the user back to the initial screen.
  const switchNav = createSwitchNavigator({
    authNav: authNavigator,
    appNav: AppNavigator,
    
    
    initialRouteName: authNavigator
  })

const AppContainer = createAppContainer(switchNav);

//Jordan Dickerson