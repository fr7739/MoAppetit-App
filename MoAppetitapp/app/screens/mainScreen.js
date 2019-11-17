import React from 'react';
import {Provider} from 'react-redux'
import store from '../redux/index'
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image, Text, ScrollView} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from '../screens/styles';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import { client } from '../hasuraAPI/shopifyAPI';
import Prod from '../components/Product';
import Search from '../components/Search';
import { SearchBar } from 'react-native-elements';
import CartIcon from '../containers/cartIcon';

 
// Added by Mamadou Store Token
// Rendering to the UI the post Registration screen with the login button and informing the user that they need to validate their email
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showSearch: false,
        auth: '',
        products: [],
        search: [],
      };
    }
    componentWillMount(){
      client.product.fetchAll().then((res) => {
        this.setState({
          products: res,
        })
      })
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


  showSearch = x =>
  {
    this.setState({showSearch: !this.state.showSearch}, () =>
    {
      this.forceUpdate();
    });
  }

  renderSearch = () => {
    if (this.state.showSearch) { 
      return (
      <View>
      <Search search = {this.state.search} client={client} ></Search>
      </View>
      )
    }
  }


  renderAll = () => {
    if (!this.state.showSearch) { 
      return (
        
        <ScrollView>
        <Prod products = {this.state.products} client = {client} navigation = {this.props.navigation} />
        </ScrollView>
  
      )
    }
  }

//Store Token End 

  render() {
    
      return (

        <Provider store = {store}>
        <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover' style={styles.backgroundImage}>
                <Header 
                    backgroundColor = "#086522"
                    leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={<Icon name="search" onPress={this.showSearch}  />}
                    rightComponent={<CartIcon />}
                   />
                  {this.renderSearch()}
                  {this.renderAll()}
           </ImageBackground>
           </Provider>
      );
  }
}




// END: Added by Mamadou