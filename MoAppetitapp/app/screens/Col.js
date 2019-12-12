import React from 'react';
import {Provider} from 'react-redux'
import store from '../redux/index'
import { View, ImageBackground, ScrollView} from 'react-native';
import styles from '../screens/styles';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import { client } from '../hasuraAPI/shopifyAPI';
import Search from '../components/Search';
import CartIcon from '../containers/cartIcon';
import Connection from '../components/Connection';


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

    // Fetch All the products from Shopify
    componentWillMount(){
        client.collection.fetchAllWithProducts().then((res) => {
          this.setState({
            collections: res,
          })
        })
      }

  // Show the search product on screen
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

// call collections from connection component
  renderAll = () => {
    if (!this.state.showSearch) { 
      return (
        
        <ScrollView>
        <Connection collections = {this.state.collections} client = {client} navigation = {this.props.navigation} />
        </ScrollView>
  
      )
    }
  }

// Render or show the whole products on screen
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