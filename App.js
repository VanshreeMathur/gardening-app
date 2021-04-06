
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

Amplify.configure(awsconfig);

const MyTheme = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 200,
    width: '100%',
    backgroundColor: '#29C16C',
  },
  section: {
    flex: 1,
    width: '100%',
    padding: 30,
  },
  sectionHeader: {
    width: '100%',
    marginBottom: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sectionHeaderText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
  },
  sectionFooter: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 20,
  },
  sectionFooterLink: {
    fontSize: 14,
    color: '#FFF',
    alignItems: 'baseline',
    textAlign: 'center',
    padding: 8,
  },
  navBar: {
    marginTop: 35,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navButton: {
    marginLeft: 12,
    borderRadius: 4,
  },
  cell: {
    flex: 1,
    width: '50%',
  },
  errorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorRowText: {
    marginLeft: 10,
  },
  photo: {
    width: '100%',
  },
  album: {
    width: '100%',
  },
  button: {
    backgroundColor: '#EE7729',
    alignItems: 'center',
    padding: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ffbb8f',
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  formField: {
    marginBottom: 22,
  },
  input: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#FFF',
  },
  inputLabel: {
    marginBottom: 8,
    color: '#FFF',
  },
  phoneContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 2,
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#C4C4C4',
  },
  picker: {
    flex: 1,
    height: 44,
  },
  pickerItem: {
    height: 44,
  },
});

const signUpConfig = {
      header: 'Create an Account',
      hideAllDefaults: true,
      defaultCountryCode: '1',
      signUpFields: [
        {
          label: 'Username',
          key: 'username',
          placeholder: 'John Smith',
          required: true,
          displayOrder: 1,
          type: 'string'
        },
        {
          label: 'Password',
          key: 'password',
          placeholder: 'examplepassword123',
          required: true,
          displayOrder: 2,
          type: 'password'
        },
        {
          label: 'Email',
          key: 'email',
          placeholder: 'johnsmith@gmail.com',
          required: true,
          displayOrder: 3,
          type: 'string'
        },
  ]
};

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
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
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

  return (
    <NavigationContainer>
        {isUserLoggedIn === 'initializing' && <Initializing />}
        {isUserLoggedIn === 'loggedIn' && (
          <AppNavigator updateAuthState={updateAuthState}/> && <Navigator />
        )}
        {isUserLoggedIn === 'loggedOut' && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>
  );
}
// wrap the App component as shown below
export default App;
