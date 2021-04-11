import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

// const backgroundImage = "../assets/mainImage.jpg"

export default function Contact() {

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}> Contact Information </Text>
        <Text style={styles.subtitle}> Harvest Data Collection App </Text>
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
  },
  title: {
    marginTop:100,
    fontSize: 30,
    marginBottom:30,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15
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
