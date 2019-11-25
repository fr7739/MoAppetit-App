import React from 'react';
import { StyleSheet, View, ImageBackground,  KeyboardAvoidingView, Image, Text} from 'react-native';
export default StyleSheet.create({
  
  // KBAV for Login, Register, and passwordForm
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

// CircleMoAppetit for Login and Register Page
    CircleMoAppetit:
    {  
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: 'rgba(12, 57, 14, 0.85)', 
      fontSize:80,
      lineHeight: 0, 
      paddingTop: 65,
      width: 150,
      height: 150,
      color: "#E8E8E8",
      borderRadius: 75,
      borderWidth: 0,
      overflow: "hidden",
      marginBottom:15,
      margin: 10,

    },

    // ButtonHolder presents in Login and Register Pages
    buttonHolder: 
    {
      flex: .2,
      flexDirection: 'row',
      justifyContent: "space-between",
      width: "60%"
    },

    // backgroundImage for Login, Register, and PasswordForm
    backgroundImage: {  
      width: '100%',
     height: '100%', 
    }, 

    // FieldsAea2 for UserScreen
    fieldsArea2: 
    {
        flex: .26,
        borderWidth: 3,
        marginBottom: 0,
        paddingBottom: 0,
        backgroundColor: "white",
        width: "60%",
        
    },

    // addressLine for Userscreen
    addressLine:
    {
      fontSize:16,
      justifyContent: "flex-start",
      color:"black",
      backgroundColor: "white"
    },

    // AddressBox for Userscreen
    AddressBox: {
      flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
       paddingLeft: 20,
       paddingRight: 20,
       borderRadius:3,
       borderColor: "black",
       borderBottomWidth: 3,
       marginTop:0,
       backgroundColor: 'white',
        borderWidth: 3,
        marginBottom: 0,
        paddingBottom: 0,
        width: "80%"
 
     },

     // Container for Login, Register, InitialScree, PostRegister
    container: {
     flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius:200,
      marginTop:0
    },

    // ButtonStyle for Userscreen
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

    // ButtonStyle for SearchResultProduct, Products
    buttonStyle6:
    {
    width: 150,
    height: 100,
    marginLeft: 0,
    marginRight: 3,
    marginTop: 10,
    paddingTop:5,
    marginBottom: 0,
    justifyContent: 'center',
    },

    // ButtonStyleDown for Login and Register pages
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

      // ButtonStyle for Register, PostRegister, Login
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

    // Used in UserScreen
    subPageHeadStyle:
    {
      fontSize:16,
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
      justifyContent: "center",
      color:"white"
    },

    //rectangle Container for Registerform
    rectangle: {
      height: 370,
      width: 325,
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
      borderWidth: 2,
      borderRadius: 40,
      overflow: "hidden",
      left: 163,
      marginBottom:25
  },


//buttonContainer for loginform
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:300,
  width:250,
  borderRadius:30,
  left:15,
},

// Used in Login, Register
inputContainer: {
  borderBottomColor: '#F5FCFF',
  backgroundColor: '#FFFFFF',
  borderRadius:12,
  borderBottomWidth: 1,
  width:290,
  height:45,
  marginBottom:12,
  flexDirection: 'column',
  //alignItems:'flex-start',
  left: 15,
  marginTop:15,

},

//rectangle Container for Loginform
   rectangle2: {
    height: 300,
    width: 325,
    backgroundColor: 'rgba(12, 57, 14, 0.85)',
    borderWidth: 2,
    borderRadius: 40,
    overflow: "hidden",
    left: 163,
    marginBottom:70,
},

// style for Initialscreen
buttonContainer2: {
  marginTop:30,

},

// style for Initialscreen
loginButton2: {
  backgroundColor: '#3498db',
  width:380,
  overflow: "hidden",
  marginBottom:30,
  height: 50,
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
},

// style for Initialscreen
fabookButton2: {
  backgroundColor: "#3b5998",
  overflow: "hidden",
  width:380,
  //marginBottom:5,
  height: 50,
  borderWidth: 2,
  borderRadius: 40,
  marginTop:-20,
},

// style for Initialscreen
socialButtonContent2:{
},


// style for Initialscreen
welcome: {
  fontSize: 25,
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
color: "#ffffff", 
fontSize: 11,
fontWeight: '500',
left: 20,
marginBottom:20,
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
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },

   // style for About Page
   welcome3: {
    fontSize: 16,
    textAlign: 'justify',
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
    left:18,
    marginTop:15, 
  },

  //buttonContainer for loginform
buttonContainer4: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:-15,
  width:250,
  borderRadius:30,
  left:18,
},


//rectangle Container for PasswordForm
rectangle3: {
  height: 150,
  width: 325,
  backgroundColor: 'rgba(12, 57, 14, 0.85)',
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  // left: 1,
  marginBottom:10,
  //marginTop:100,
  
},


// InputContainer for Password
inputContainer2: {
  borderBottomColor: '#F5FCFF',
  backgroundColor: '#FFFFFF',
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  width:325,
  height:150,
  marginBottom:5,
  flexDirection: 'row',
  alignItems:'center',
  //left: 15,
  marginTop:200,
},


// CircleMoAppetit for InitialScreen
CircleMoAppetit2:
    {  
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: 'rgba(12, 57, 14, 0.85)', 
      fontSize:80,
      lineHeight: 0, 
      paddingTop: 65,
      //fontFamily: 'serif',
      width: 150,
      height: 150,
      color: "#E8E8E8",
      borderRadius: 75,
      borderWidth: 0,
      overflow: "hidden",
      marginBottom:90,
      margin: 10,

    },

    // Used in RatingScreen
    existingRatingContainer: {
      flex: 1,
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20
    },
      
    // Used in RatingScreen
    RatingsfieldsArea: 
    {
        flex: 4,
        marginBottom: 3,
        paddingBottom: 0,
        backgroundColor: "white",
        width: 325,
    },

    // Used in RatingScreen
    subRatingStyle:
    {
      fontSize:12,
      textAlign: "left",
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
      justifyContent: "center",
      color:"white"
    },

    //rectangle Container for Registerform
    rectangle4: {
      height: 370,
      width: 225,
      backgroundColor: 'rgba(12, 57, 14, 0.85)',
      borderWidth: 2,
      borderRadius: 40,
      //overflow: "hidden",
      right: 500,
      marginBottom:50,
  },

  //rectangle Container for Userscreen User
  rectangle5: {
    height: 300,
    width: 325,
    backgroundColor: 'rgba(12, 57, 14, 0.85)',
    borderWidth: 2,
    borderRadius: 40,
    overflow: "hidden",
    left: 45,
    marginBottom:70,
},

//rectangle Container for UserScreen Address
rectangle6: {
  height: 450,
  width: 325,
  backgroundColor: 'rgba(12, 57, 14, 0.85)',
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  left: 0,
  marginBottom:70,
},

rectangle9: {
  height: 500,
  width: 325,
  backgroundColor: 'rgba(12, 57, 14, 0.85)',
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  left: 45,
  marginBottom:70,
},

 //buttonContainer for userscreen address
 buttonContainer5: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:-20,
  width:250,
  borderRadius:30,
  left:18,
},

 //buttonContainer for userscreen address
 buttonContainer6: {
  height:40,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:17,
  width:250,
  borderRadius:30,
  left:35,
  //marginTop:-15,
},

// InputContainer for Password
inputContainer3: {
  borderBottomColor: '#F5FCFF',
  backgroundColor: '#FFFFFF',
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  width:400,
  height:450,
  marginBottom:160,
  flexDirection: 'row',
  alignItems:'center',
  left: 5,
  //marginTop:200,
},

//buttonContainer for rating
buttonContainer7: {
  height:40,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:50,
  width:250,
  borderRadius:30,
  left:35,
},

//rectangle Container for usercreen
rectangle7: {
  height: 280,
  width: 325,
  backgroundColor: 'rgba(12, 57, 14, 0.85)',
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  left: 45,
  marginBottom:80,
},

// InputContainer for user Page
inputContainer4: {
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  width:325,
  height:50,
  marginBottom:5,
  flexDirection: 'row',
  alignItems:'center',
  left: 45,
  marginBottom:10,
  backgroundColor: '#3498db',
},

// style for Initialscreen
inputContainer5: {
  backgroundColor: '#3498db',
  width:400,
  overflow: "hidden",
  marginBottom:50,
  marginTop: 50,
  height: 50,
  borderWidth: 2,
  borderRadius: 40,
  left: 5
},

//rectangle Container for userscreen
rectangle8: {
  height: 260,
  width: 325,
  backgroundColor: 'rgba(12, 57, 14, 0.85)',
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  left: 45,
  marginBottom:50,
  marginTop:0,
},

// style for Ratingscreen
inputContainer6: {
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  width:325,
  height:50,
  marginBottom:50,
  flexDirection: 'row',
  alignItems:'center',
  left: 45,
  marginTop:270,
  backgroundColor: '#3498db',
},

//rectangle Container for RatingScreen
rectangle8: {
  height: 280,
  width: 325,
  backgroundColor: 'rgba(12, 57, 14, 0.85)',
  borderWidth: 2,
  borderRadius: 40,
  overflow: "hidden",
  left: 45,
  marginBottom:80,
  marginTop:-30
},

  });

  