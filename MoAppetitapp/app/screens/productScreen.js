import React from 'react';
import {Provider} from 'react-redux'
import store from '../redux/index'
import { Icon, Container } from 'native-base';
import { Header } from 'react-native-elements';
import { client } from '../API/ShopifyAPI/shopifyAPI'
import ProductPage from '../components/productPage'
import CartIcon from '../containers/cartIcon';

export default class productScreen extends React.Component{
constructor(props){
    super(props);

    this.state ={
        product: this.props.navigation.getParam('Product'),
    }
}
      render(){
        return(
           <Provider store = {store}>
              <Container>
                 {/* Calls a special header that allows our created cart icon to be used */}
                <Header transparent
                  backgroundColor = "#086522"
                  leftComponent={<Icon name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />}
                  rightComponent={<CartIcon navigation = {this.props.navigation} />} 
                />
                
                {/* Passes the necessary information to the product page component in order to render a dynamic product page. */}
                <ProductPage product = {this.state.product} client = {client} product = {this.state.product} navigation = {this.props.navigation}/>
        
            </Container>
          </Provider> 
        )
      }
}