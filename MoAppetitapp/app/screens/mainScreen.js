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
//import Search from '../components/Search';
import { SearchBar } from 'react-native-elements';
import CartIcon from '../containers/cartIcon'
import Collection from '../components/Collection';
import AnimatedHeader from 'react-native-animated-header';
import HeaderImage from '../../assets/HeaderImage.png';

import SearchResultProduct from "../components/SearchResultProduct";



 
// Added by Mamadou Store Token
// Rendering to the UI the post Registration screen with the login button and informing the user that they need to validate their email
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showSearch: false,
        auth: '',
        products: [],
        collections: [],
        search: [],
        search: "", //What is being searched
    showingResult: false, //Is we should show nothing or results
    searchResultProducts: []
      };
    }
    componentWillMount(){
      client.product.fetchAll().then((res) => {
        this.setState({
          products: res,
        })
      })

      client.collection.fetchAllWithProducts().then((res) => {
        this.setState({
          collections: res,
        })
      });
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
        <Collection collections = {this.state.collections} navigation = {this.props.navigation} client = {client}/>
        </ScrollView>
  
      )
    }
  }



  PullSearchResults() {
    const query = {
      query: "title:*" + this.state.search + "*", //This is the filter, All titles that contain the search box text
      sortBy: "title"
    };
    client.product.fetchQuery(query).then(res => { //Fetches query from Shopify API
      this.setState({
        searchResultProducts: res  //Sets the results recieved by the query call into the state's searchResultProducts variable
      });
    });
  }

  /**Updates the search variable in the Search Component’s State, and calls the PullSearchResults function to update the character.
   *  Calling the function  every time the search is updated allows the function to update on every character press. That’s 
   * why the search results seem instantaneous. */
  updateSearch = search => {
    this.setState({ search }, () => {
      //Set State is Async, so need to do things in callback function
      this.state.showingResult = true;
      this.PullSearchResults();
      
    });
  /*  if(this.SearchResultProductsElement.current !== null)
    {
    this.SearchResultProductsElement.current.clearProduct()
    }
    else
    {
      console.log("its null right now");
    }*/
  };

  clearSearch()  {
    this.setState({ search : ""  });
    this.setState({searchResultProducts: []});
  };



  
  /**Renders a single SearchResultProduct Component with the Search component’s search results  state variable attached. This allows
   *  the data fetched in the Search component when the PullSearchResults function is called to update the data in the 
   * SearchResultProduct component. */
  renderSearchResults() {
    return (
      <View>
        <SearchResultProduct
          products={this.state.searchResultProducts}
          client={client}
          searchText = {this.state.search}
          clearSearch = {this.clearSearch.bind(this)}
        />
      </View>
    );
  }

  /** This is basically a compact holder for the search results. It checks if the state is set to show result, and depending on the check shows nothing or the results. */
  renderResultsContainer() {
    if (this.state.showingResult) { //if we want to see results
      return (
        <View>
          <View>{this.renderSearchResults()}</View>
        </View>
      );
    } else {//if we are not ready to see results
      return <View></View>;
    }
  }

  

//Store Token End 

  render() {
    const { search } = this.state;
      return (
        
        <Provider store = {store}>
          
        <AnimatedHeader 
        style={{flex: 1 }}
        renderLeft={() => (<Icon style={{left:10, marginBottom:-5}} size={80} name="menu" onPress={() => this.props.navigation.openDrawer()} />)}
        renderRight={() => (<Icon name="search" onPress={this.showSearch} />)}
        renderRight={() => (<CartIcon navigation = {this.props.navigation} />)}            
        headerMaxHeight={200}
        imageSource={HeaderImage}
        toolbarColor='#086522'
        disabled={false}
        
      >
   
        <ScrollView> 
          
        <View>
        <KeyboardAvoidingView>
          
          <SearchBar
            lightTheme
            //leftComponent={<Icon name="search" onPress={this.showSearch}  />}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            //onPress={() => this.props.navigation.navigate('Search')}
            value={search}
          />
        </KeyboardAvoidingView>

        <View style={{ backgroundColor: "white" }}>
          {this.renderResultsContainer()}
        </View>
      </View> 
         
        <Collection collections = {this.state.collections} navigation = {this.props.navigation} client = {client}/>
        </ScrollView>
        </AnimatedHeader>
        </Provider>
        
      );
  }
}




// END: Added by Mamadou