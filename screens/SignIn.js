// Imported Libraries
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

// Export Function
export default function SignIn({ navigation, updateAuthState }) {

  //Initialize username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Sign-In Function
  async function signIn() {
    //Confirm that the user exists
    try {
      //Match username with password
      await Auth.signIn(username, password);
      //Console -> Success Message
      console.log('✅ Success');
      //Update Auth State -> User is logged in
      updateAuthState('loggedIn');
    } catch (error) {
      //Else, console logs error
      console.log('❌ Error signing in...', error);
      //Show user error message -> ask them to retry
      Alert.alert(
        "Error",
        "❌ Error signing in...Incorrect Credentials",
        [
          {
            text: "Try Again!",
          }
        ]
      )
    }
  }

  return (
    //Main Container
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        //Title
        <Text style={styles.title}>Welcome to Nourish! </Text>
        //Sub-title
        <Text style={styles.subtitle}> Harvest Data Collection App </Text>
        //Prompt user for username
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        //Prompt user for password
        <AppTextInput
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        //Login Button -> Will activate the Sign-In function
        <AppButton title="Login" onPress={signIn} />
        //Sign-Up Button for New Users
        <View style={styles.footerButtonContainer}>
          //Navigate to Sign-Up Page
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            // Text within Sign-Up Button
            <Text style={styles.signUpText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

//Styling for Page
const styles = StyleSheet.create({
  //Safe-Area Container
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#29C16C'
  },
  //Container
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  //Title
  title: {
    fontSize: 35,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15
  },
  //SUb-title
  subtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15,
    fontStyle: 'italic'
  },
  //Footer Container
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  //Sign-Up Button Text
  signUpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
});
