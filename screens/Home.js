// Imported Libraries
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Linking} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator } from 'react-native';
import { ProfilePicture } from 'react-native-profile-picture';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, Authenticator } from 'aws-amplify-react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import Navigator from '../routes/homeStack.js';

//Export Function
export default function Home({ navigation, updateAuthState }){

    //Navigator for UserPost Page
    const pressHandler1 = () => {
        navigation.navigate('Harvest');
    }
    //Navigator for Stats Page
    const pressHandler2 = () => {
        navigation.navigate('Stats');
    }

    //Sign-out function
    async function signOut(){
      //Confirm that user is able to sign-out
      try{
        //Print success message to console
        await Auth.signOut();
        console.log('✅ Successfully Logged Out');
        //Update Auth State
        updateAuthState('loggedOut');
      }
      //Else, print error message in console
      catch(error){
        console.log("Error signing out : ", error);
      }
    }

    //Navigator for Web Browser link -> Leads to Nourish Website
    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://www.nourishproject.ca/contact-us');
        setResult(result);
      };

    return(
      //Main Container
      <View style={styles.container}>
          {/* Title */}
          <Text style={styles.profileHeading}> Home </Text>

          {/* Contact-Us Button -> Will activate WebBrowser Navigator */}
          <TouchableOpacity style={styles.contactUsButton} onPress = {_handlePressButtonAsync}>
            <Text style={styles.loginText}> Contact us! </Text>
          </TouchableOpacity>

          {/* Post Harvest Data Button */}
          <TouchableOpacity style={styles.profileButtons} onPress = {pressHandler1}>
            <Text style={styles.loginText}>Post Harvest Data</Text>
          </TouchableOpacity>

          {/* View Statistics Button */}
          <TouchableOpacity style={styles.profileButtons} onPress = {pressHandler2}>
            <Text style={styles.loginText}>View Statistics</Text>
          </TouchableOpacity>

          {/* Sign-out button -> Will activate signOut function */}
          <TouchableOpacity style={styles.signupBtn} onPress= {signOut}>
            <Text style={styles.loginText}> LOG OUT </Text>
          </TouchableOpacity>
        </View>
    )
}

// Styling for Page
const styles = StyleSheet.create({
    //Container
    container: {
    flex: 1,
    backgroundColor: '#29C16C',
    alignItems: 'center',
    },
    //Title
    profileHeading:{
    marginTop:45,
    fontSize:40,
    color:"#ffffff",
    marginBottom:25
    },
    //Contact Us Button
    contactUsButton:{
    width:"25%",
    backgroundColor:"#EE7729",
    borderRadius:10,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:40
    },
    //Navigator Buttons
    profileButtons:{
    width:"75%",
    backgroundColor:"#202b30",
    borderRadius:15,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
    },
    //Navigator Button Text
    loginText:{
    color:"white",
    },
    //signOut button
    signupBtn:{
    width:"100%",
    backgroundColor:"#EE7729",
    borderRadius:0,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    position: "absolute",
    bottom:0,
    marginTop:40,
    },
    //View
    flatView:{
    height: 50
    }
});
