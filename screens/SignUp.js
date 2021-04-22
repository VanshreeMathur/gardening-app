// Imported Libraries
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import DropDownPicker from 'react-native-dropdown-picker';

// Export Function
export default function SignUp({ navigation }) {

  // Initialize username, password, email, postal code, and farmer type
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [farmertype, setFarmerType] = useState('');

  //Sign-Up Function
  async function signUp() {
    //Attempt to sign-up user with given username, password and email
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      //Success Message in Console
      console.log('✅ Sign-up Confirmed');
      //User is navigated to ConfirmSignUp Page
      navigation.navigate('ConfirmSignUp');
    } catch (error) {
      //Else, console logs error
      console.log('❌ Error signing up...', error);
      // Show user error message -> ask user to enter valid input for all fields
      Alert.alert(
        "Error",
        "❌ Error signing up... please enter a username, password and a valid email address",
        [
          {
            text: "Try Again!",
          }
        ]
      )
    }
  }
  return (
    // Main Container
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Create an Account</Text>
        {/* Prompt User for Username */}
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        {/* Prompt User for Password */}
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
        {/* Prompt User for Email */}
        <AppTextInput
          value={email}
          onChangeText={text => setEmail(text)}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        {/* Sign-Up Button */}
        <AppButton title="Sign Up" onPress={signUp} />
        {/* Footer Container */}
        <View style={styles.footerButtonContainer}>
          {/* Navigate to Sign-In Page */}
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            {/* Text for Sign-In Button */}
            <Text style={styles.signInButton}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

//Styling for Pages
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
  //Footer Container
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  //Sign-In Button
  signInButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  }
});
