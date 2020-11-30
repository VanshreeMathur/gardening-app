// Code Help for Front-End: https://github.com/Alhydra/React-Native-Login-Screen-Tutorial
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, ActivityIndicator, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
// import logo from './assets/nourish.png';

// NOTE: MAKE SURE TO CHANGE YOUR DATA IN THE routes.js FILE SO IT WORKS WITH YOUR LOCAL DATABASE
// HERE ARE THE LINKS TO HELP YOU

// DATABASE SETUP AND USE: https://dev.to/saulojoab/how-to-get-data-from-an-mysql-database-in-react-native-53a4
// FETCHING DATA FROM THE DATABASE: https://reactnative.dev/docs/network


export default class App extends Component {

  constructor(props) {
    super(props);

    // States

    this.state = {
      data: [],
      isLoading: true,
      email: "",
      password: "",
    };

  }

  // // Gets and Stores Data from the Database

  componentDidMount() {
    fetch('http://YOURIP:3000/user')            //    REPLACE "YOURIP" WITH YOUR IP ADDRESS
    .then((response) => response.json())
    .then((json) => {
      this.setState({ data: json});
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({ isLoading: false });
    });
  }  

  render() {

    const { data, isLoading } = this.state;
    
    // Styling

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#29C16C',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        // fontWeight:"bold",
        fontSize:50,
        color:"#ffffff",
        marginBottom:15
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
      // blackBox:{
      //   width:"80%",
      //   backgroundColor:"#000000",
      //   borderRadius:15,
      //   height:50,
      //   marginBottom:20,
      //   justifyContent:"center",
      //   padding:20
      // },
      inputText:{
        height:50,
        color:"#003f5c"
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
      loginText:{
        color:"white",
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

    return (

      <View style={styles.container}>

        {/* The FlatList displays the data we got from the database. NOTE: This is what is causing the page layout to mess up.*/}
        <View style={styles.flatView}>
          <FlatList
            data={data}
            keyExtractor={({ user_id }, index) => user_id}
            renderItem={({item}) => (
              <Text>{item.email}, {item.password} </Text>

            )}
          />

        </View>
        {/* Titles */}

        <Text style={styles.logo}> Nourish Project </Text>
        <Text style={styles.logo2}> For Peterborough Gardeners </Text>

        {/* Email text Box */}

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({email : text})}/>
        </View>

        {/* Password Text Box */}

        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(password) => this.setState({password : password})}/>
        </View>

        {/*<Text style={styles.logo}> {this.state.email} </Text>*/}


        {/* Forgot Password Button */}

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>


        {/* Create Account Button */}

        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.loginText}>Create a New Account</Text>
        </TouchableOpacity>

      </View>
    );
  }     
}
