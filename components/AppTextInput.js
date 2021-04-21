//Imported Libraries
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Export Function for AppTextInput Component (Used by Authentication Screens)
export default function AppTextInput({ leftIcon, ...otherProps }) {
  return (
    //Main Container
    <View style={styles.container}>
      //Icon Placement
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color="#6e6869"
          style={styles.icon}
        />
      )}
      //Textbox Placement
      <TextInput
        style={styles.input}
        placeholderTextColor="#6e6869"
        {...otherProps}
      />
    </View>
  );
}

//Styling for Component
const styles = StyleSheet.create({
  //Container
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10
  },
  //Icon
  icon: {
    marginRight: 10
  },
  //Input
  input: {
    width: '80%',
    fontSize: 18,
    color: '#101010'
  }
});
