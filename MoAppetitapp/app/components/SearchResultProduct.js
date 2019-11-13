import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import styles from "../screens/styles";

/**This component represent a collection of items(product) that is found in the Search component’s state’s searchResultProducts 
 *  variable. */
class SearchResultProduct extends Component {
  constructor(props){
    super(props)
    this.state ={
        currentProduct: null
    }
}

  showProduct (product) 
  {
    this.setState({currentProduct: product});
  }


  renderSelectedProduct(currentProduct)
  {
    
   // const { currentProduct } = this.state.currentProduct;
    if (currentProduct != null) { 
     return (
        <View style={{ borderWidth: 2, backgroundColor: "white", flex: 6}}>

          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text style={{fontSize: 20}}>{currentProduct.title}</Text>
          </View>
          <Text>Price: {currentProduct.variants[0].price}</Text>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Image
              source={{ uri: currentProduct.images[0].src }}
              style={styles.buttonStyle6}
            />
          </View>
        </View>
      );
    } else {//if we are not ready to see current product
      return <View></View>;
    }
  }

  /**Primary Rendering of the SearchResultProduct Component. For each item, the item’s image, title, and price are displayed. The
   *  item’s key is generated from the product id, this insures that each component that is drawn in the UI also has a unique key.
   *  To reintroduce the image and price remove the subcomponent’s display attribute.   */
  render() {
    /* The variable products is set as an property when the component is created, as 
       in (<SearchResultProduct products={this.state.searchResultProducts}..) */
    let products = this.props.products.map(product => {
      return (
        <View
          key={product.id.toString()}
          style={{ borderWidth: 2, backgroundColor: "white" }}
        >

          <Text>{console.log(product.images[0].src)}</Text>
          <View
            style={{ display: "none", flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Image
              source={{ uri: product.images[0].src }}
              style={styles.buttonStyle6}
            />
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text onPress={() => this.showProduct(product)}>{product.title}</Text>
          </View>
          <View
            style={{ flex: 1, display: "none", flexDirection: "row", justifyContent: "center" }}
          >
            <Text>Price: {product.variants[0].price}</Text>
          </View>
        </View>
      );
    });
    return (
      <View>
        <ScrollView>{products}</ScrollView>
        
        <ScrollView>{this.renderSelectedProduct(this.state.currentProduct)}</ScrollView>
      </View>
    );
  }
}
export default SearchResultProduct;