// Imported Libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

//Export Function
export default function ConfirmSignUp({ navigation }) {

  //Initialize username and authentication code
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');

  //Confirm Sign-Up Function
  async function confirmSignUp() {

    //Confirm that the authCode matches the code sent to username
    try {
      await Auth.confirmSignUp(username, authCode);
      //Success Message in Console
      console.log('✅ Code confirmed');
      //Navigate back to Sign-In page
      navigation.navigate('SignIn');
    } catch (error) {
      //Else, print error message in console
      console.log(
        '❌ Verification code does not match. Please enter a valid verification code.',
        error.code
      );
      //Show user error message -> ask them to retry
      Alert.alert(
        "Error",
        "❌ Verification code does not match. Please enter a valid verification code.",
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
        <Text style={styles.title}>Confirm Sign Up</Text>
        //Sub-title
        <Text style={styles.subtitle}> Check email for verification code </Text>
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
        //Prompt user for verification code
        <AppTextInput
          value={authCode}
          onChangeText={text => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        //Confirm SignUp Button -> Will activate confirmSignUp function
        <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
      </View>
    </SafeAreaView>
  );
}

// Styling for Page
const styles = StyleSheet.create({
  // Safe-Area Container
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
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15
  },
  //Sub-title
  subtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15,
    fontStyle: 'italic'
  },
});
