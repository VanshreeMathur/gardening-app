//Imported Libraries
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

//Export Function for AppButton Component (Used by Authentication Screens)
export default function AppButton({ title, onPress }) {
  return (
    // {onPress} and {title} will vary on page
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

//Styling for Component
const styles = StyleSheet.create({
  //Button
  button: {
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '75%',
    backgroundColor: '#EE7729'
  },
  //Button Text
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});
