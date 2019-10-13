
import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Animated, Platform } from 'react-native';

import {Button} from 'react-native-material-ui';


export default class CartScreen extends React.Component {
    constructor()
    {
        super();
 
        this.state = { 
          
          ViewArray: [], 
 
          Disable_Button: false 
 
        }
 
        this.animatedValue = new Animated.Value(0);
        
        this.Array_Value_Index = 0;
 
    }
 
    Add_New_View_Function = () =>
    {
        this.animatedValue.setValue(0);
 
        let New_Added_View_Value = { Array_Value_Index: this.Array_Value_Index }
 
        this.setState({ Disable_Button: true, ViewArray: [ ...this.state.ViewArray, New_Added_View_Value ] }, () =>
        {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() =>
            {
                this.Array_Value_Index = this.Array_Value_Index + 1;
 
                this.setState({ Disable_Button: false });
            }); 
        });              
    }
 
    render()
    {
        const AnimationValue = this.animatedValue.interpolate(
        {
            inputRange: [ 0, 1 ],
 
            outputRange: [ -59, 0 ]
        });
 
        let Render_Animated_View = this.state.ViewArray.map(( item, key ) =>
        {
            if(( key ) == this.Array_Value_Index)
            {
                return(
 
                    <Animated.View 
                      key = { key } 
                      style = {[ styles.Animated_View_Style, { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>
                        
                   
                    </Animated.View>
                
              );
            }
            else
            {
                return(
 
                    <View 
                      key = { key } 
                      style = { styles.Animated_View_Style }>
 
 
                    </View>
 
                );
            }
        });
 
        return(
            <View style = { styles.MainContainer }>
 
                <ScrollView>
 
                    <View style = {{ flex: 1, padding: 2 }}>
                    {
                        Render_Animated_View
                    }
                    </View>
 
                </ScrollView>
 
                <TouchableOpacity 
                activeOpacity = { 0.7 } 
                style = { styles.TouchableOpacityStyle } 
                disabled = { this.state.Disable_Button } 
                onPress = { this.Add_New_View_Function }>
                    
                <Button style={{ container: styles.buttonStyle}} text=" " raised={true} primary={true} onPress={ () => this.Add_New_View_Function()}/>
                
                </TouchableOpacity>
 
            </View>
        );
    }
}
 
const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
    },
 
    Animated_View_Style:
    {
        height: 70,
        backgroundColor: '#72a0c1',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
 
    View_Inside_Text:
    {
        color: '#fff',
        fontSize: 24
    },
 
    TouchableOpacityStyle:{
  
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
 
    FloatingButtonStyle: {
  
      resizeMode: 'contain',
      width: 50,
      height: 50,
    }
});