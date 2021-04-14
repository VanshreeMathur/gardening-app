import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
export default function ConfirmSignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log('✅ Code confirmed');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(
        '❌ Verification code does not match. Please enter a valid verification code.',
        error.code
      );
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
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>
        <Text style={styles.subtitle}> Check email for verification code </Text>
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
          value={authCode}
          onChangeText={text => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
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
    fontSize: 20,
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
});
