// Imported Libraries
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createUserPost } from '../graphql/mutations';
import { listUserPosts } from '../graphql/queries';
import RadioButtonRN from 'radio-buttons-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import awsconfig from '../aws-exports';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

Amplify.configure(awsconfig)

// default values of data set to be pushed to the database
const initialState = {user_id: 1, product_type: -1, product_size: -1, product_quantity: -1, timeline_start: "", timeline_end: ""};

// allows the user to click anywhere on the screen to dismiss the keyboard
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress ={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default function UserPost(){

  // formstate set to initialState by default
  const [formState, setFormState] = useState(initialState);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts()
  }, [])

  // update specific value in the formstate with user provided data
  function setInput(key, value){
    setFormState({ ...formState, [key]: value });
  }

  // grab user posts from database (currently not displaying this data anywhere)
  async function fetchUserPosts(){

    try{
      const userPostData = await API.graphql(graphqlOperation(listUserPosts));
      const userPosts = userPostData.data.listUserPosts.items;
      setUserPosts(userPosts);

    } catch (err) { {/*console.log('Error fetching posts.') */}};

  }

  // submit user post to the database
  async function addUserPost(){
    try{
      const userPost = {...formState};
      setUserPosts([...userPosts, userPost]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createUserPost, {input: userPost}));

    } catch (err) {
      // console.log('Error creating post:', err);
    }
    // provide success message
    Alert.alert(
      "Done",
      "Your harvest has been recorded!",
      [
        {
          text: "Okay",
        }
      ]
    )
  }

  // validates form fields
  function validate(){

    // if product type is invalid
    if(formState.product_type == -1 || formState.product_type == null){
      // send error
      Alert.alert(
        "Error",
        "Please select a product type.",
        [
          {
            text: "Okay",
          }
        ]
      )
    }
    // if product size is invalid
    else if(formState.product_size == -1){
      // send error
      Alert.alert(
        "Error",
        "Please select a product size.",
        [
          {
            text: "Okay",
          }
        ]
      )
    }
    // if product quantity is invalid
    else if(!Number.isInteger(parseFloat(formState.product_quantity)) || formState.product_quantity < 0){
      // send error
      Alert.alert(
        "Error",
        "Invalid product quantity.",
        [
          {
            text: "Okay",
          }
        ]
      )
    }
    // if timeline_start (month) is invalid
    else if(formState.timeline_start == "" || formState.timeline_start == null){
      // send error
      Alert.alert(
        "Error",
        "Please select a harvest month.",
        [
          {
            text: "Okay",
          }
        ]
      )
    }
    // if no errors were sent
    else{
      // add post to database
      addUserPost();
    }
  }

  // data for radio buttons
  const buttonData = [
    {
      label: 'Large',
      value: 0
    },
    {
      label: 'Medium',
      value: 1
    },
    {
      label: 'Small',
      value: 2
    }
  ]
    return (
      // allows keyboard dismiss by tapping anywhere on screen
      <DismissKeyboard>

        <View style={styles.container}>
          {/* <Text style={styles.logo}> My Harvest </Text> */}

          <Text style = {styles.headings}> Product Type </Text>

          {/* Product Type */}

          <View style={styles.picker}>
            <RNPickerSelect
              // send value
              onValueChange={(value) => setInput('product_type',value)}
              // useNativeAndroidPickerStyle={false}
              items={[
                { label: 'Tomatoes', value: 0},
                { label: 'Head of Lettuce', value: 1},
                { label: 'Kale', value: 2},
                { label: 'Carrots', value: 3},
                { label: 'Peppers', value: 4},
                { label: 'Radishes', value: 5},
                { label: 'Potatoes', value: 6},
                { label: 'Squash', value: 7},
                { label: 'Cucumbers', value: 8},
                { label: 'Beans', value: 9},
                { label: 'Garlic', value: 10},
                { label: 'Beets', value: 11}
              ]}
              style={customPickerStyles.inputIOS}
            />
          </View>

          <View style = {styles.inputText}>
            <Text style = {styles.headings}> Average Product Size </Text>
          </View>
          
          {/* Product Size Radio Buttons */}

          <View style={styles.btnBox}>
            <RadioButtonRN
              data = {buttonData}
              // send value
              selectedBtn = {(e) => setInput('product_size', e.value)}
              style = {styles.newBtn}
            />

          </View>

          <View style = {styles.headings}>
              <Text style = {styles.headings}> Estimated Pieces of Product </Text>
          </View>
          
          {/* Product Quantity */}

          <View style={styles.inputView} >
          <TextInput
              keyboardType = 'numeric'
              // send value
              onChangeText={val => setInput('product_quantity', val)}
              style={styles.inputText}
              value = {formState.product_quantity}
              placeholder = "Product Quantity"
              />
          </View>

          <Text style = {styles.headings}> Harvest Month </Text>
          
          {/* Month Picker */}

          <View style={styles.picker}>
            <RNPickerSelect
              //currently month value is stored as a string in timeline_start as I could not edit the schema (optimally this would be changed)
              // send value
              onValueChange={(value) => setInput('timeline_start',value)}
              items={[
                { label: 'January', value: 0},
                { label: 'February', value: 1},
                { label: 'March', value: 2},
                { label: 'April', value: 3},
                { label: 'May', value: 4},
                { label: 'June', value: 5},
                { label: 'July', value: 6},
                { label: 'August', value: 7},
                { label: 'September', value: 8},
                { label: 'October', value: 9},
                { label: 'November', value: 10},
                { label: 'December', value: 11}
              ]}
              style={customPickerStyles.inputIOS}
            />
          </View>

          {/* Create Post Button */}
          {/* Calls Validation Function */}
          <TouchableOpacity title="Create Post" style= {styles.submit} onPress={validate}>
            <Text style = {styles.btnText}> Create Post </Text>
          </TouchableOpacity>

          {/* {

            // LISTS THE USER POSTS ON SCREEN

          userPosts.map((userPost, index) => (

              <View key={userPost.id ? userPost.id: index}>
              <Text>{userPost.user_id}</Text>
              <Text>{userPost.product_type}</Text>
              <Text>{userPost.product_size}</Text>
              <Text>{userPost.product_quantity}</Text>
              <Text>{userPost.timeline_start}</Text>
              <Text>{userPost.timeline_end}</Text>
              </View>

          ))
          } */}

        </View>


      </DismissKeyboard>

    )
}



const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingTop: 13,
    paddingHorizontal: 10,
    height: 30,
    color: 'black',
    paddingBottom: 12, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  headings:{
    color: 'white',
    fontWeight: 'bold',
    padding: 5
  },
  picker: {
    width:"80%",
    backgroundColor:"#ffffff",
    borderRadius:15,
    height:50,
    marginBottom: 10,
    marginTop: 10,
    justifyContent:"center",
    padding:20,
  },
  dateButton: {
    marginBottom:20,
    color:"#EE7729",
  },
  btnText: {
    color: 'white'
  },
  newBtn: {
    width: 200,
    height: 50,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  submit: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 15,
    marginTop: 15
  },
  date: {
    backgroundColor: '#EE7729',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20
  },
  btnAlt:{
    width: 80,
    height: 80,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  btnBox:{
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 40,
    paddingBottom: 70
  },
  btnText:{
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#29A86B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150
  },
  logo:{
    // fontWeight:"bold",
    fontSize:50,
    color:"#ffffff",
    marginBottom:15
  },
  logo2:{
    // fontWeight:"bold",
    fontSize:20,
    color:"#ffffff",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#ffffff",
    borderRadius:15,
    height:50,
    marginBottom:20,
    marginTop: 5,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#003f5c"
  },
  forgot:{
    color:"white",
    fontSize:13,
    textDecorationLine: 'underline'
  },
  loginBtn:{
    width:"50%",
    backgroundColor:"#EE7729",
    borderRadius:15,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white",
  },
  signupBtn:{
    width:"100%",
    backgroundColor:"#EE7729",
    borderRadius:0,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    position: "absolute",
    bottom:0,
    marginTop:40,
    // marginBottom:10
  },flatView:{
    height: 50
  }
})
