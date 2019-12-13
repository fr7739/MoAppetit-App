import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Card, Button } from 'react-native-elements'
import {connect} from 'react-redux'
import { Icon } from 'native-base';


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
    ///here
    this.setState({currentProduct: product});
    // this.props.clearSearch();
    this.props.products = [];
    
    this.forceUpdate(); //Force the page to rerender with the changes

  }


  clearProduct () 
  {
    ///here
    this.setState({currentProduct: null});
    this.forceUpdate(); //Force the page to rerender with the changes
  }


  renderSelectedProduct(currentProduct)
  {
    
   // const { currentProduct } = this.state.currentProduct;
    if (currentProduct ) { 
      console.log("Should show...", currentProduct)
     return (
      <Card
      title={currentProduct.title}
      image={{uri: currentProduct.images[0].src}}>
      <Text style={{marginBottom: 10}}>
          {currentProduct.description}
      </Text>
          <Button
              onPress = {() => this.props.addItemToCart(currentProduct)}
              icon={<Icon name='md-cart' color='#ffffff' style = {{padding: 1}} />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#086522'}}
          title='ADD TO CART' />
  </Card> 
      );
    } else {//if we are not ready to see current product
      console.log("But shows...")
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
          style={{ borderWidth: 0,  }}//asdsdad
        >

          <Text>{console.log(product.images[0].src)}</Text>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text onPress={() => this.props.showProduct(product)} style={{fontSize: 20, marginBottom: 15}}>{product.title}</Text>
          </View>
          <View
            style={{ flex: 1, display: "none", flexDirection: "row", justifyContent: "center" }}
          >
            <Text>Price: {product.variants[0].price}</Text>
          </View>
        </View>
      );
    });
    //console.log("asdadfadf", this.props.showingProduct, this.props.productToShow)
    return (
      <View>
        {
          !this.props.showingProduct && 
          <ScrollView >{products}</ScrollView>
        }
        { this.props.showingProduct && this.props.productToShow &&
         <ScrollView>{this.renderSelectedProduct(this.props.productToShow)}</ScrollView> }
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