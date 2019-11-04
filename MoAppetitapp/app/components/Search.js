import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from '../screens/styles'
import { SearchBar } from 'react-native-elements';

class Search extends Component {
    state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
        console.log("the text is now: "+ this.state.search);
      };

      searchPressed = search =>
      {
        this.setState({ search });
        console.log("Searching for text: "+ this.state.search);
        this.forceUpdate();
      }
    
      render() {
        const { search } = this.state;
    
        return (
            <KeyboardAvoidingView>
                <SearchBar
                    lightTheme
                    round
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                />
             </KeyboardAvoidingView>
        );
      }
    
}
export default Search