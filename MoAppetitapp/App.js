import React from 'react';
import {Provider} from 'react-redux'
import Container from './app/screens/navigation';
import store from './app/redux/index'
// Added by Salwa
// App starts running from this fucntion
export default class App extends React.Component {

  render() {
   return (
   
   <Container />
   
   );
  }
}
// END: Added by Salwa
