import React, { Component } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import styles from "../screens/styles";
import { SearchBar } from "react-native-elements";
import { client } from "../hasuraAPI/shopifyAPI";
import SearchResultProduct from "./SearchResultProduct";

class Search extends Component {
  state = {
    search: "",
    showingResult: false,
    searchResultProducts: []
  };

  PullSearchResults() {
    const query = {
      query: "title:*" + this.state.search + "*", //All titles that contain the search box text
      sortBy: "title"
    };
    client.product.fetchQuery(query).then(res => {
      this.setState({
        searchResultProducts: res
      });
    });
  }

  updateSearch = search => {
    this.setState({ search }, () => {
      //Set State is Async, so need to do things in callback function
      this.state.showingResult = true;
      this.PullSearchResults();
    });
  };

  searchPressed = search => {
    this.setState({ search });
    this.forceUpdate();
  };

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

  renderResultsContainer() {
    if (this.state.showingResult) {
      return (
        <View>
          <View>{this.renderSearchResults()}</View>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

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
