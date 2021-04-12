import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

// const backgroundImage = "../assets/mainImage.jpg"

export default function SignIn({ navigation, updateAuthState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log('✅ Success');
      updateAuthState('loggedIn');
    } catch (error) {
      console.log('❌ Error signing in...', error);
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
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Nourish! </Text>
        <Text style={styles.subtitle}> Harvest Data Collection App </Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
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
        <AppButton title="Login" onPress={signIn} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#29C16C'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15,
    fontStyle: 'italic'
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  // backgroundContainer: {
  //   flex: 1,
  //   resizeMode: 'cover',
  //   width: undefined,
  //   height: undefined,
  //   backgroundColor: '#889DAD',
  // },
});
