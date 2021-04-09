import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import { ActivityIndicator } from 'react-native';
import { ProfilePicture } from 'react-native-profile-picture';
import Amplify, { Auth } from 'aws-amplify';


export default function Home({ navigation, updateAuthState }){

    const pressHandler1 = () => {
        navigation.navigate('Harvest');
    }
    const pressHandler2 = () => {
        navigation.navigate('Stats');
    }

    async function signOut(){
      try{
        await Auth.signOut();
        console.log('✅ Successfully Logged Out');
        updateAuthState('loggedOut');
      }
      catch(error){
        console.log("Error signing out : ", error);
      }
    }


    return(

      <View style={styles.container}>

          {/* Titles */}

          <Text style={styles.profileHeading}> Home </Text>

          {/* Profile Picture */}

          {/* <View style={styles.profilePicture}>
            <ProfilePicture
            isPicture={true}
            shape='circle'
            backgroundColor='#7060eb'

            />
          </View> */}

          {/* Change Profile Picture */}

          <TouchableOpacity style={styles.profilePictureButton}>
            <Text style={styles.loginText}>Change</Text>
          </TouchableOpacity>

          {/* Post Harvest Data Button */}

          <TouchableOpacity style={styles.profileButtons} onPress = {pressHandler1}>
            <Text style={styles.loginText}>Post Harvest Data</Text>
          </TouchableOpacity>

          {/* View Statistics Button */}

          <TouchableOpacity style={styles.profileButtons} onPress = {pressHandler2}>
            <Text style={styles.loginText}>View Statistics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupBtn} onPress= {signOut}>

            <Text style={styles.loginText}> LOG OUT </Text>

          </TouchableOpacity>

        </View>

    )

}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#29C16C',
    alignItems: 'center',
    // justifyContent: 'center',
    },
    profileHeading:{
    // fontWeight:"bold",
    marginTop:45,
    fontSize:40,
    color:"#ffffff",
    marginBottom:25
    },
    logo2:{
    // fontWeight:"bold",
    fontSize:20,
    color:"#ffffff",
    marginBottom:40
    },
    inputView:{
    width:"80%",
    backgroundColor:"#ffffff",
    borderRadius:15,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
    },

    inputText:{
    height:50,
    color:"#003f5c"
    },
    dropDown:{
    // Empty
    },
    forgot:{
    color:"white",
    fontSize:13,
    textDecorationLine: 'underline'
    },
    loginBtn:{
    width:"50%",
    backgroundColor:"#EE7729",
    borderRadius:15,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
    },
    profilePictureButton:{
    width:"25%",
    backgroundColor:"#EE7729",
    borderRadius:10,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:40
    },
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
    loginText:{
    color:"white",
    },
    profilePicture:{
    padding:20,
    },
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
    // marginBottom:10
    },flatView:{
    height: 50
    }
});
