//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>



// Code Help for Front-End: https://github.com/Alhydra/React-Native-Login-Screen-Tutorial
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
// import logo from './assets/nourish.png';

const db = SQLite.openDatabase('./databases/user.db') // returns Database object

// Check if the items table exists if not create it
db.transaction(tx => {

  console.log("test1")
  // tx.executeSql('INSERT INTO User (user_id, user_name, email_id, password, postal_code, gardener_type, location_prefs) VALUES (1, "Vanshree", "vanshreemathur@trentu.ca", "1998", "K9H 4B6", 1, 1)', ['gibberish', 0],
  //   (txObj, resultSet) => this.setState({ data: this.state.data.concat(
  //       { id: resultSet.insertId, text: 'gibberish', count: 0 }) }),
  //   (txObj, error) => console.log('Error', error))
      // error => {console.log(error)}
      // this.fetchData() // ignore it for now

      tx.executeSql('SELECT user_name FROM User', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => this.setState({ data: _array }),
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL

      console.log("test3")
})

export default class App extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        data: null
      }
    }

    fetchData = () => {
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT user_name FROM User', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => this.setState({ data: _array }),
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction
  }


  state={
    email:"",
    password:""
  }
  render(){
    return (
      <View style={styles.container}>

        <Text style={styles.logo}> Nourish Project </Text>
        <Text style={styles.logo2}> For Peterborough Gardeners </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>

        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.loginText}>Create a New Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  }
});
