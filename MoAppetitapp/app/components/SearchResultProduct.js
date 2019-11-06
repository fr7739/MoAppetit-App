import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import styles from "../screens/styles";

class SearchResultProduct extends Component {
  render() {
    let products = this.props.products.map(product => {
      return (
        <View
          key={product.id.toString()}
          style={{ borderWidth: 2, backgroundColor: "white" }}
        >
          <Text>{console.log(product.images[0].src)}</Text>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Image
              source={{ uri: product.images[0].src }}
              style={styles.buttonStyle6}
            />
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text>{product.title}</Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text>Price: {product.variants[0].price}</Text>
          </View>
        </View>
      );
    });
    return (
      <View>
        <ScrollView>{products}</ScrollView>
      </View>
    );
  }
}
export default SearchResultProduct;