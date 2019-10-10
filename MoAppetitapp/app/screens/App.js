/* import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import InitialScreen from './initialScreen';
import LoginScreen from './loginForm';
import RegisterScreen from './registrationForm';
import PostRegisterScreen from './postRegisterScreen';
import{ createAppContainer } from 'react-navigation';

// Added by Salwa
const AppNavigator = createStackNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  // Initial screen when app is opened
  Initial: {
      screen: InitialScreen,
    navigationOptions: () => ({
    }),
  },
  // Login screen with option to return back to Initail Screen
  Login: {
      screen: LoginScreen,
    navigationOptions: () => ({
      header:null,
      headerTintColor: 'rgba(12, 57, 14, 0.85)',
    }),
  },
  // Registration screen with option to return back to Initial Screen
  Register: {
      screen: RegisterScreen,
    navigationOptions: () => ({
      headerTintColor: 'rgba(12, 57, 14, 0.85)',
    }),
  },
  // Post Registration screen with option to login after verifying email
  PostRegister: {
    screen: PostRegisterScreen,
  navigationOptions: () => ({
    headerTintColor: 'rgba(12, 57, 14, 0.85)',
    headerLeft: null,
    gesturesEnabled: false,
  }),
},
Main: {
  screen: MainScreen,
  navigationOptions: () => ({
  headerTintColor: 'rgba(12, 57, 14, 0.85)',
}),
},
});

// Stores the navigation for the entire app
const Container = createAppContainer(AppNavigator);

export default Container;
// END: Added by Salwa */