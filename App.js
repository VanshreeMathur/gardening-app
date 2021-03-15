
// Code Help for Front-End: https://github.com/Alhydra/React-Native-Login-Screen-Tutorial
import 'react-native-gesture-handler';
import React, { Component } from 'react';

import Navigator from './routes/homeStack.js';

import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
// import MyTheme from './amplify/AuthUI/MyTheme.js';
Amplify.configure(awsconfig);

// import logo from './assets/nourish.png';

class App extends Component {
      render() {
          return (
            <Navigator />
          );
      }
};

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
        {
          label: 'Postal Code',
          key: 'postalcode',
          placeholder: 'K9H 4B6',
          required: true,
          displayOrder: 5,
          type: 'string'
        },
        {
          label: 'Type of Farmer',
          key: 'farmertype',
          placeholder: 'Community Farmer or Backyard Farmer',
          required: true,
          displayOrder: 6,
          type: 'string'
        },
  ]
};

export default withAuthenticator(App, { signUpConfig });
