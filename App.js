
// Code Help for Front-End: https://github.com/Alhydra/React-Native-Login-Screen-Tutorial
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, ActivityIndicator, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import ProfilePicture from 'react-native-profile-picture'

// import logo from './assets/nourish.png';

// NOTE: MAKE SURE TO CHANGE YOUR DATA IN THE routes.js FILE SO IT WORKS WITH YOUR LOCAL DATABASE
// HERE ARE THE LINKS TO HELP YOU

// DATABASE SETUP AND USE: https://dev.to/saulojoab/how-to-get-data-from-an-mysql-database-in-react-native-53a4
// FETCHING DATA FROM THE DATABASE: https://reactnative.dev/docs/network


class HomeScreen extends Component {

  constructor(props) {
    super(props);

    // States

    this.state = {
      // json data
      data: [],
      // response password
      respas: "",
      // loading boolean
      isLoading: true,
      // text field email
      email: "",
      // text field password
      password: "",
    };

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
        {/* <View style={styles.flatView}>
          <FlatList
            data={data}
            keyExtractor={({ user_id }, index) => user_id}
            renderItem={({item}) => (
              <Text>  {item.password} </Text>
            )}
          />

        </View> */}

        {/* Titles */}

        <Text style={styles.logo}> Nourish Project </Text>
        <Text style={styles.logo2}> For Peterborough Gardeners </Text>

        {/* Displays the response password*/}
        <Text> {this.state.respas} </Text>


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

        <TouchableOpacity
          style={styles.loginBtn}
          // when submit is pressed
          onPress={() =>{

            // will fetch the user_id and password for the account with whatever email you provide in the url

            fetch(`http://YOURIP:3000/api/users/${this.state.email}`)            //    REPLACE "YOURIP" WITH YOUR IP ADDRESS
            .then((response) => response.json())
            .then((json) => {
              // store json in data state
              this.setState({ data: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
              this.setState({ isLoading: false });
            });

              try{
                // store the password
                this.setState({ respas : data[0]["password"]});
              }
              catch(error){
                console.log("error");
              }

              // IMPORTANT: IF YOU DO NOT SEE THE PASSWORD POP UP ON THE SCREEN, PRESS SUBMIT AGAIN AND IT SHOULD WORK. THIS IS MY CURRENT PROBLEM.


          }}
        >

          <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Profile')}> LOGIN </Text>
        </TouchableOpacity>


        {/* Create Account Button */}

        <TouchableOpacity style={styles.signupBtn}>
        <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('CreateAccount')}>Create a New Account</Text>

        </TouchableOpacity>

      </View>
    );
  }
}

class CreateaccountScreen extends Component {

  constructor(props) {
    super(props);

    // States

    this.state = {
      data: [],
      isLoading: true,
      email: "",
      username: "",
      password: "",
      cpassword: "",
      postalcode: "",
      gardenertype: "",
    };

  }

    render() {
      //
      const { data, isLoading } = this.state;

      // Styling

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#29C16C',
          alignItems: 'center',
          // justifyContent: 'center',
        },
        createaccount:{
          // fontWeight:"bold",
          fontSize:40,
          color:"#ffffff",
          marginBottom:50
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

          <Text style={styles.createaccount}> Create Account </Text>

          {/* Email text Box */}

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({email : text})}/>
          </View>

          {/* Username Text Box */}

          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({username : text})}/>
          </View>

          {/* Password Text Box */}

          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({password : text})}/>
          </View>

          {/* Confirm Password Text Box */}

          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({cpassword : text})}/>
          </View>

          {/* Postal Code Text Box */}

          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Postal Code"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({postalcode : text})}/>
          </View>

          {/* Gardener Text Box */}

          <View style={styles.dropDown} >
          <DropDownPicker
              items={[
                  {label: 'Community Gardener', value: 'Community'},
                  {label: 'Backyard Gardener', value: 'Backyard'},
              ]}
              placeholder="Type of Gardener"
              placeholderStyle={{color: '#003f5c'}}
              containerStyle={{height: 50, width: 325}}
              activeItemStyle={{color: 'black'}}
              onChangeItem={item => console.log(item.label, item.value)}

          />
          </View>

          {/*<Text style={styles.logo}> {this.state.email} </Text>*/}


          {/* Submit Button */}

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>SUBMIT</Text>
          </TouchableOpacity>


          {/* Create Account Button */}

          <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Home')}> Already Have An Account? Login! </Text>

          </TouchableOpacity>

        </View>
      );

    }
}

class Profile extends Component {

  constructor(props) {
    super(props);

    // States

    this.state = {
      data: [],
      isLoading: true,
      email: "",
      username: "",
      password: "",
      cpassword: "",
      postalcode: "",
      gardenertype: "",
    };

  }

    render() {
      //
      const { data, isLoading } = this.state;

      // Styling

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#29C16C',
          alignItems: 'center',
          // justifyContent: 'center',
        },
        profileHeading:{
          // fontWeight:"bold",
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

          <Text style={styles.profileHeading}> Profile/Name </Text>

          {/* Profile Picture */}

          <View style={styles.profilePicture}>
          <ProfilePicture
          isPicture={true}
          shape='circle'
          backgroundColor='#7060eb'

          />
          </View>

          {/* Change Profile Picture */}

          <TouchableOpacity style={styles.profilePictureButton}>
            <Text style={styles.loginText}>Change</Text>
          </TouchableOpacity>

          {/* Edit Account Info Button */}

          <TouchableOpacity style={styles.profileButtons}>
            <Text style={styles.loginText}>Edit Account Info</Text>
          </TouchableOpacity>

          {/* Post Harvest Data Button */}

          <TouchableOpacity style={styles.profileButtons}>
            <Text style={styles.loginText}>Post Harvest Data</Text>
          </TouchableOpacity>

          {/* View Statistics Button */}

          <TouchableOpacity style={styles.profileButtons}>
            <Text style={styles.loginText}>View Statistics</Text>
          </TouchableOpacity>


          {/* Create Account Button */}

          <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Home')}> LOGOUT </Text>

          </TouchableOpacity>

        </View>
      );

    }
}



const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        CreateAccount: CreateaccountScreen,
        Profile: Profile
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}
