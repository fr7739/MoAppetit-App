import React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer';
import{ createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from '../components/Homescreen';
import AboutScreen from '../components/Aboutscreen';
import DebugScreen from '../components/Debugscreen';
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
import cartIcon from '../containers/cartIcon'



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
const drawNav = createDrawerNavigator({
  Main: {
    screen: MainScreen,
  },
  Ratings:{
    screen: RatingsScreen
  },
  'User Info':{
  screen: UserScreen
  },
  'About Us': {
    screen: AboutUs
  },
  cart: {
    screen: CartScreen
  },
})

const AppNavigator = createStackNavigator({

drawNavigator: drawNav,
Main: MainScreen,
Ratings: RatingsScreen,
Product: productScreen,
'User Info': UserScreen,
'About Us':AboutScreen,
cart: CartScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   });

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

  const switchNav = createSwitchNavigator({
    authNav: authNavigator,
    appNav: AppNavigator,
    
    
    initialRouteName: authNavigator
  })
// Stores the navigation for the entire app

// const logNavigator = StackNavigator({
//   Login: {
//     screen: LoginScreen,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Login',  // Title to appear in status bar
//       headerLeft: <Image source={require('../../assets/drawer.png')} size={35} onPress={ () => navigation.navigate('DrawerOpen') } />,
//     })
//   }
// });

const AppContainer = createAppContainer(switchNav);

// END: Added by Salwa