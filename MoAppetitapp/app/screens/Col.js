import React from 'react';
import {Provider} from 'react-redux'
import store from '../redux/index'
import { View, ImageBackground, ScrollView} from 'react-native';
import {AsyncStorage} from 'react-native';
import styles from '../screens/styles';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import { client } from '../API/ShopifyAPI/shopifyAPI';
import Search from '../components/Search';
import CartIcon from '../containers/cartIcon';
import Connection from '../components/Connection';

 
// Added by Mamadou Store Token
// Rendering to the UI the post Registration screen with the login button and informing the user that they need to validate their email
export default class Col extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showSearch: false,
        auth: '',
        collections: [],
        search: [],
      };
    }
    componentWillMount(){
        client.collection.fetchAllWithProducts().then((res) => {
          this.setState({
            collections: res,
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
        <Connection collections = {this.state.collections} client = {client} navigation = {this.props.navigation} />
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
                    leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
                    rightComponent={<CartIcon navigation = {this.props.navigation} />} />
                  {this.renderAll()}
           </ImageBackground>
           </Provider>
      );
  }
}




// END: Added by Mamadou