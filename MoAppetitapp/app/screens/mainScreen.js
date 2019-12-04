import React from 'react';
import {Provider} from 'react-redux'
import store from '../redux/index'
import {View, KeyboardAvoidingView, ScrollView,ImageBackground} from 'react-native';
import {AsyncStorage} from 'react-native';
import { Icon } from 'native-base';
import { client } from '../hasuraAPI/shopifyAPI';
import { SearchBar, Card } from 'react-native-elements';
import CartIcon from '../containers/cartIcon'
import Collection from '../components/Collection';
import AnimatedHeader from 'react-native-animated-header';
import HeaderImage from '../../assets/HeaderImage.png';
import styles from '../screens/styles';
import SearchResultProduct from "../components/SearchResultProduct";


export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showSearch: false,
        auth: '',
        products: [],
        collections: [],
        search: [],
        productToShow: null,
        search: "", //What is being searched
    showingResult: false, //Is we should show nothing or results
    showingProduct: false,
    searchResultProducts: [],
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

  //Get Token Value
  getValue = async () => {
    try {
      const auth = await AsyncStorage.getItem('token');
        console.log("Token: " +auth)
    }
    catch (error) {
        console.log("error")
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
    this.setState({ search, showingProduct: false }, () => {
      //Set State is Async, so need to do things in callback function
      this.state.showingResult = true;
      this.PullSearchResults();
      
    });
  };

  
// This function is called in Search bar that clears the product on the screen
  clearSearch()  {
   this.setState({ search : "", showingProduct: false, showingResult: false, productToShow: null  });
      //Set State is Async, so need to do things in callback function
      this.state.showingResult = true;
      this.PullSearchResults();
    
  };

  // Show Product on the screen
  showProduct(product) {
    this.setState({ productToShow: product, showingProduct: true})
  }

  /**Renders a single SearchResultProduct Component with the Search component’s search results  state variable attached. This allows
   *  the data fetched in the Search component when the PullSearchResults function is called to update the data in the 
   * SearchResultProduct component. */
  renderSearchResults() {
    return (
      <View>
        <SearchResultProduct
          products={this.state.searchResultProducts}
          productToShow={this.state.productToShow}
          client={client}
          searchText = {this.state.search}
          showingProduct = {this.state.showingProduct}
          clearSearch = {this.clearSearch.bind(this)}
          showProduct = {this.showProduct.bind(this)}
        />
      </View>
    );
  }

  /** This is basically a compact holder for the search results. It checks if the state is set to show result, and depending on the check shows nothing or the results. */
  renderResultsContainer() {
    if (this.state.showingResult) { //if we want to see results
      return (
        <Card>
        <View>
          <View>{this.renderSearchResults()}</View>
        </View>
        </Card>
      );
    } 
  }

  render() {
    const { search } = this.state;
      return (
        
        <Provider store = {store}>
          <ImageBackground source={require('../assets/OpeningPageBackground.jpg')} resizeMode='cover' style={styles.backgroundImage}>
        <AnimatedHeader 
        style={{flex: 1 }}
        renderLeft={() => (<Icon style={{ marginLeft: 20 }} size={80} name="menu" onPress={() => this.props.navigation.openDrawer()} />)}
        renderRight={() => (<CartIcon style={{ marginLeft: 20, left: 20, bottom: 20 }} navigation = {this.props.navigation} />)}  
        headerMaxHeight={170}
        imageSource={HeaderImage}
        toolbarColor='#086522'
        parallax
        disabled={false}
        
      >
        
        <ScrollView> 

      <View>
        <KeyboardAvoidingView>  
          <SearchBar   
          round
          searchIcon={() => (<Icon name="search" onPress={() => this.clearSearch()} />)}
          inputStyle={{ backgroundColor: "black" }}
          placeholder="Search..."
          placeholderTextColor={'#FFFFFF'}
          onChangeText={this.updateSearch}
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
        </ImageBackground>
        </Provider>
        
      );
  }
}




// END: Added by Mamadou