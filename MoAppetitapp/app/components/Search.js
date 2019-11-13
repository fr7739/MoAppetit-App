import React, { Component } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { SearchBar } from "react-native-elements";
import { client } from "../hasuraAPI/shopifyAPI";
import SearchResultProduct from "./SearchResultProduct";

class Search extends Component {
  state = {
    search: "", //What is being searched
    showingResult: false, //Is we should show nothing or results
    searchResultProducts: [] //List of all products that match the filter
  };

/** Pulls all search results from Shopify client passing in a query dictionary containg the filter and sorting spesifications. */
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


  /** Primary Rendering of the Search Component. Shows the searchbox and the results if applicable. */
  render() {
    const { search } = this.state;
    return (
      <View>
        <KeyboardAvoidingView>
          <SearchBar
            lightTheme
            round
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
        </KeyboardAvoidingView>

        <View style={{ backgroundColor: "white" }}>
          {this.renderResultsContainer()}
        </View>
      </View>
    );
  }
}
export default Search;
