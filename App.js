// Imported Libraries
import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, StatusBar, Button } from 'react-native';
import Navigator from './routes/homeStack.js';
import { createStackNavigator } from '@react-navigation/stack';
import { withAuthenticator, Authenticator } from 'aws-amplify-react-native'
import { AmplifyTheme } from 'aws-amplify-react-native';
import Amplify, { Auth, AmplifyButton } from 'aws-amplify';
import awsconfig from './aws-exports';
import { NavigationContainer } from '@react-navigation/native';

//Navigation Routes
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ConfirmSignUp from './screens/ConfirmSignUp';
import Home from './screens/Home';
import Harvest from './screens/UserPost.js';
import Stats from './screens/Stats.js';

//Configure Amplify -> Authentication
Amplify.configure(awsconfig);

//Navigation Stack for Authentication
const AuthenticationStack = createStackNavigator();
//Navigation Stack for App
const AppStack = createStackNavigator();

//Authentication Navigator
const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      //Sign-In Screen
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      //Sign-Up Screen
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      //Confirm Sign-Up Screen
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};

//App Navigator
const AppNavigator = props => {
  return (
    <AppStack.Navigator>
      //Home Screen
      <AppStack.Screen name="Home">
        {screenProps => (
          <Home {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AppStack.Screen>
      //User Post Screen
      <AppStack.Screen name="Harvest">
        {screenProps => (
          <Harvest {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AppStack.Screen>
      //Statistics Screen
      <AppStack.Screen name="Stats">
        {screenProps => (
          <Stats {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

//Initializing App Function
const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#29C16C" />
    </View>
  );
};

// App Function
function App() {
  //Initializing User Auth State
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

  //Calls checkAuthState function
  useEffect(() => {
    checkAuthState();
  }, []);

  //Check Auth State Function
  async function checkAuthState() {
    //Confirm if user is authenticated and signed in
    try {
      await Auth.currentAuthenticatedUser();
      //Console -> Success Message
      console.log('✅ User is signed in');
      //Set user auth state -> Logged In
      setUserLoggedIn('loggedIn');
    } catch (err) {
      //Else, console -> error message
      console.log('❌ User is not signed in');
      //Set User Auth State -> Logged Out
      setUserLoggedIn('loggedOut');
    }
  }

  //Update Auth State Function
  function updateAuthState(isUserLoggedIn) {
    //Check if user is logged in
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    //Navigation Container
    <NavigationContainer>
        //Initializing App -> Initializing Function
        {isUserLoggedIn === 'initializing' && <Initializing />}
        // When user is logged in -> update auth state for App Navigator
        {isUserLoggedIn === 'loggedIn' && (
          <AppNavigator updateAuthState={updateAuthState}/>
        )}
        // When user is logged out -> update auth state for Authentication Navigator
        {isUserLoggedIn === 'loggedOut' && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>
  );
}

// Export Function - Wrapped App Component
export default App;
