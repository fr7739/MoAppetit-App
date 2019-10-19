import React from 'react';
import { StyleSheet, View, ImageBackground,  KeyboardAvoidingView, Image, Text} from 'react-native';
export default StyleSheet.create({
  
  TextField:
  {
    
  },
  KBAV:
  {
    flex: 1,
    paddingTop: 1,
    alignItems: 'center',
    marginLeft: -100,
    marginRight: -100,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 20
  },
    fieldsArea: 
    {
        flex: .53,
        borderWidth: 3,
        marginBottom: 0,
        paddingBottom: 0,
        backgroundColor: "white",
        width: "60%"
    },

    // Login Area Style
    fieldsArea2: 
    {
        flex: .26,
        borderWidth: 3,
        marginBottom: 0,
        paddingBottom: 0,
        backgroundColor: "white",
        width: "60%",
        
    },

    CircleMoAppetit:
    {  
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: 'rgba(12, 57, 14, 0.85)', 
      fontSize:80,
      lineHeight: 0, 
      paddingTop: 65,
      fontFamily: 'serif',
      width: 150,
      height: 150,
      color: "#E8E8E8",
      borderRadius: 75,
      borderWidth: 0,
      overflow: "hidden",
      marginBottom:15,
      margin: 10,

    },
    aboutImage:
    {
      width: 50,
      height: 50

    },
    buttonHolder: 
    {
      flex: .2,
      flexDirection: 'row',
      justifyContent: "space-between",
      width: "60%"
  
    },
    backgroundImage: {  // Thamima Changes
      width: '100%',//
     height: '100%', //
    }, //
    container: {
     flex: 1,
      paddingTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius:100,

    },
    buttonStyle2:
    {
    width: 375,
    borderWidth: 3,
    justifyContent: 'center',
    backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
    },

    buttonStyle4:
    {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },

    buttonStyle3:
    {
    width: 300,
    height: 300,
    borderWidth: 3,
    justifyContent: 'center',
    backgroundColor: 'rgba(132,132,132, 0.85)'
    },

    textDisplay:
    {
      width: "60%",
      height: "60%",
      backgroundColor: 'rgba(132,132,132, 0.85)'

    },

    buttonStyleDown: {
      flex: 2,
      backgroundColor: 'rgba(232,232,232, 0.85)',
      width: 299,
      height: 40,
      borderWidth: 3,
      borderRadius: 30,
      overflow: "hidden",
      left: "0%",
      marginBottom:5,

      
      },
    buttonStyle: {
      flex: 2,
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
      width: 299,
      height: 40,
      borderWidth: 3,
      borderRadius: 30,
      overflow: "hidden",
      left: "3%",
      marginBottom:5,
    
    },
    subPageHeadStyle:
    {
      fontSize:22,
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
      justifyContent: "center",
      color:"white"
    },
    longText:
    {
      fontSize: 12,
      paddingTop: 2,
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
      justifyContent: "center",
      color:"white"
    },

    rectangle: {
      height: 370,
      width: 325,
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
      borderWidth: 2,
      borderRadius: 40,
      overflow: "hidden",
      left: 163,
      marginBottom:25,

  },

  input: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'

},

socialButtonContent:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center', 
},

fabookButton: {
  backgroundColor: "#3b5998",
  overflow: "hidden",
  left: 22,
},

buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
  left:15,
},

icon:{
  width:30,
  height:30,
},

inputIcon:{
  marginLeft:15,
  justifyContent: 'center'
},

inputContainer: {
  borderBottomColor: '#F5FCFF',
  backgroundColor: '#FFFFFF',
  borderRadius:10,
  borderBottomWidth: 1,
  width:290,
  height:45,
  marginBottom:12,
  flexDirection: 'row',
  alignItems:'center',
  left: 15,
  marginTop:15,

},

inputs:{
  height:45,
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  flex:1,
},

restoreButtonContainer:{
  width:230,
  marginBottom:15,
  left: 20,
},

loginButton: {
  backgroundColor: '#3498db',
  width:250,
  overflow: "hidden",
  left: 20,


},

loginText: {
  color: 'white',
},

   rectangle2: {
    height: 120,
    width: 302,
    backgroundColor: 'rgba(12, 57, 14, 0.85)',
    borderWidth: 4,
    borderRadius: 33,
    left: 3,
},

// style for Initialscreen
buttonContainer2: {
 
},

// style for Initialscreen
loginButton2: {
  backgroundColor: '#3498db',
  width:350,
  overflow: "hidden",
  marginBottom:5,
  height: 50,
},

// style for Initialscreen
fabookButton2: {
  backgroundColor: "#3b5998",
  overflow: "hidden",
  width:350,
  marginBottom:5,
  height: 50,
},

// style for Initialscreen
socialButtonContent2:{
},


// style for Initialscreen
welcome: {
  fontSize: 23,
  textAlign: 'center',
  margin: 10,
},


// style for Initialscreen
  signupTextCont: 
  {
  flexGrow: 1,
  alignItems: 'flex-end',
  justifyContent: 'center',
  paddingVertical: 16,
  flexDirection: 'row'
},


// style for Initialscreen
signupText: 
{
color: "#000000",
fontSize: 16,
},

// style for Initialscreen
signupButton: 
{
color: "#32cd32", 
fontSize: 16,
fontWeight: '500'
},

// style for Initialscreen
signupButton2: 
{
color: "#32cd32", 
fontSize: 16,
fontWeight: '500',
left: 40,
},





// style for Password
  container2: {
    flex: 2,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
  },


  // style for password
  input2: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1
  },

  submitButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 15,
    alignItems: "center",
    height: 40
  },


    // style for password
  submitButtonText: {
    color: "white"
  },


  // style for password
  loginButton3: {
    backgroundColor: '#3498db',
    width:384,
    overflow: "hidden",
    //marginBottom:5,
    height: 50,
    left: 14
  },


    // style for password
  welcome2: {
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
  },
  
  // Button Container for Register
  buttonContainer3: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    left:15,
    marginTop:15,
  
  },


  });

  