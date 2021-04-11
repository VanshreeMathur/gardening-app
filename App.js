
// Code Help for Front-End: https://github.com/Alhydra/React-Native-Login-Screen-Tutorial
import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, StatusBar, Button } from 'react-native';
import Navigator from './routes/homeStack.js';
import { createStackNavigator } from '@react-navigation/stack';

import { withAuthenticator, Authenticator } from 'aws-amplify-react-native'
import { AmplifyTheme } from 'aws-amplify-react-native';
import Amplify, { Auth, AmplifyButton } from 'aws-amplify';
import awsconfig from './aws-exports';

//Test
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ConfirmSignUp from './screens/ConfirmSignUp';
import Home from './screens/Home';
import Harvest from './screens/UserPost.js';
import Stats from './screens/Stats.js';

Amplify.configure(awsconfig);

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();
const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};
const AppNavigator = props => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home">
        {screenProps => (
          <Home {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Harvest">
        {screenProps => (
          <Harvest {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Stats">
        {screenProps => (
          <Stats {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#29C16C" />
    </View>
  );
};

function App() {

  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

  useEffect(() => {
    checkAuthState();
  }, []);
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('✅ User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('❌ User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

//&& <Navigator />

  return (
    <NavigationContainer>
        {isUserLoggedIn === 'initializing' && <Initializing />}
        {isUserLoggedIn === 'loggedIn' && (
          <AppNavigator updateAuthState={updateAuthState}/>
        )}
        {isUserLoggedIn === 'loggedOut' && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>

  );
}
// wrap the App component as shown below
export default App;
