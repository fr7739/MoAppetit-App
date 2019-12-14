// import React, {Component} from 'react';
// import { Text, View, Image, TouchableOpacity } from 'react-native';
// import { Button } from "react-native-material-ui";
// import { TextField } from "react-native-materialui-textfield";

// class CartInsert extends Component{


//     render(){

//         return(
//             <View style = {{flex: 1,  flexDirection: "row", flexWrap: 'wrap',}}>
//                 {/* Left Button */}
//                 <View>
//                     <Button
//                     title = "-"
//                     onPress = {() => this.props.decrementCart(this.props.product)}
//                     />
//                 </View>
                
//                 {/* Text Box */}
//                 <View>
//                     <TextField
//                         label = "Quantity"
//                         keyboardType = 'number-pad'
//                     />
//                 </View>

//                 {/* Right Button */}
//                 <View>
//                     <Button
//                         title = "+"
//                         onPress = {() => this.props.addItemToCart(this.props.product)}
//                     />
//                 </View>
//             </View>
//         )
//     }
// }

// //Dispatches the shopping functions so that they can be used
// const mapDispatchToProps = (dispatch) =>{
//     return{
//       addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
//       decrementCart: (product) => dispatch({type: 'DECREMENT_FROM_CART', payload: product}),
//       removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART', payload: product})
//     }
//   }

// //maps the cart items from the store so that the information can be rendered and manipulated
// const mapStateToProps = (state) => {
//     return {
//         cartItems: state.cart
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CartInsert)
// //Jordan Dickerson