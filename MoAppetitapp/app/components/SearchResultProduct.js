import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import styles from "../screens/styles";
import { Card, ListItem, Button } from 'react-native-elements'
import {connect} from 'react-redux'
import { Icon, Container } from 'native-base';


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
      <Card
      title={currentProduct.title}
      image={{uri: currentProduct.images[0].src}}>
      <Text style={{marginBottom: 10}}>
          {currentProduct.description}
      </Text>
          <Button
              onPress = {this.props.addItemToCart}
              icon={<Icon name='md-cart' color='#ffffff' style = {{padding: 1}} />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#086522'}}
          title='ADD TO CART' />
  </Card> 
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
const mapDispatchToProps = (dispatch) =>{
  return{
    addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product})
  }
}
export default connect(null, mapDispatchToProps)(SearchResultProduct)