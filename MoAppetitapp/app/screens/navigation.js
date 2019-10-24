import React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer';
import{ createAppContainer } from 'react-navigation';
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

import CartScreen from './cartScreen';


//import { createStackNavigator, StackNavigator } from 'react-navigation-stack';


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
const AppNavigator = createDrawerNavigator({

Home: {
  screen: HomeScreen,
  navigationOptions: ({navigation}) => ({
    headerTintColor: 'rgba(12, 57, 14, 0.85)',
    drawerLabel: <Hidden />,
    drawerLockMode: "locked-closed",
  }),
  },
  
'Contact Us': { 
  screen: ContactUs,
  navigationOptions: {
    drawerLabel: <Hidden />,
    drawerLockMode: "locked-closed",
  }

},

'About Us': {
  screen: AboutUs,

  navigationOptions: {
    drawerIcon: () => (
      <Image
        source={require('../assets/Vector.jpg')}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
    )
  }
},


'My Ratings': {
  screen: RatingsScreen,
  navigationOptions: {
    drawerIcon: () => (
      <Image
        source={require('../assets/Vector.jpg')}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
    )
  }
},
'User': {
  screen: UserScreen,

  navigationOptions: {
    drawerIcon: () => (
      <Image
        source={require('../assets/Vector.jpg')}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
    )
  }
},

Main: {
  screen: MainScreen, 
  navigationOptions: {
    drawerIcon: () => (
      <Image
        source={require('../assets/home-icon.png')}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
    )
  }
},

Debug: {
  screen: DebugScreen
},

cart : {
  screen: CartScreen,
  navigationOptions: () => ({
    headerTintColor: 'rgba(12, 57, 14, 0.85)',
    drawerLabel: <Hidden />,
    drawerLockMode: "locked-closed",
  }),
},


Login: {
  screen: LoginScreen,
navigationOptions: () => ({
  headerTintColor: 'rgba(12, 57, 14, 0.85)',
  drawerLabel: <Hidden />,
  drawerLockMode: "locked-closed",
}),
},

  // Post Registration screen with option to login after verifying email
  PostRegister: {
    screen: PostRegisterScreen,
  navigationOptions: () => ({

    headerTintColor: 'rgba(12, 57, 14, 0.85)',
    drawerLabel: <Hidden />,
    drawerLockMode: "locked-closed",
  }),
},

 // Registration screen with option to return back to Initial Screen
 Register: {
  screen: RegisterScreen,
navigationOptions: () => ({
  headerTintColor: 'rgba(12, 57, 14, 0.85)',
  drawerLabel: <Hidden />,
  drawerLockMode: "locked-closed",
}),
},

}, {
initialRouteName: "Login",
contentOptions: {
  activeTintColor: '#e91e63'
},


  // drawerPosition: 'left',
  // //contentComponent: 'CustomDrawerNavigation',
  // drawerOpenRoute: 'DrawerOpen',
  // drawerCloseRoute: 'DrawerClose',
  // drawerToggleRoute: 'DrawerToggle',
  // DimensionsdrawerWidth: ('width' / 3) * 2,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
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

const AppContainer = createAppContainer(AppNavigator);

// END: Added by Salwa