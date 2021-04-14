import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native'

import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createUserPost } from '../graphql/mutations'
import { listUserPosts } from '../graphql/queries'

import RadioButtonRN from 'radio-buttons-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import awsconfig from '../aws-exports'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

Amplify.configure(awsconfig)

const initialState = {user_id: 1, product_type: -1, product_size: -1, product_quantity: -1, timeline_start: "", timeline_end: ""};

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress ={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default function UserPost(){

  // this.state = {date: Date.now()}

  const [formState, setFormState] = useState(initialState);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts()
  }, [])

  function setInput(key, value){
    setFormState({ ...formState, [key]: value });
  }

  async function fetchUserPosts(){

    try{

      const userPostData = await API.graphql(graphqlOperation(listUserPosts));
      const userPosts = userPostData.data.listUserPosts.items;
      setUserPosts(userPosts);

    } catch (err) { {/*console.log('Error fetching posts.') */}};

  }

  async function addUserPost(){
    try{
      const userPost = {...formState};
      setUserPosts([...userPosts, userPost]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createUserPost, {input: userPost}));

    } catch (err) {
      // console.log('Error creating post:', err);
    }

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

  function validate(){

    if(formState.product_type == -1){
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
    else if(formState.product_size == -1){
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
    else if(!Number.isInteger(parseFloat(formState.product_quantity)) || formState.product_quantity < 0){
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
    else{
      addUserPost();
    }
  }



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

  //====================
//Setting up Date Picker
const [date, setDate] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(true);

// when date is selected
const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);
};

const showMode = (currentMode) => {
  setShow(true);
  setMode(currentMode);
};

const showDatepicker = () => {
  showMode('date');
};

    return (
      <DismissKeyboard>

        <View style={styles.container}>
          {/* <Text style={styles.logo}> My Harvest </Text> */}

          <Text style = {styles.headings}> Product Type </Text>

          <View style={styles.picker}>
            <RNPickerSelect
              onValueChange={(value) => setInput('product_type',value)}
              items={[
                { label: 'Tomatoes', value: 1},
                { label: 'Lettuce', value: 2},
                { label: 'Kale', value: 3},
                { label: 'Carrots', value: 4},
                { label: 'Peppers', value: 5},
                { label: 'Radishes', value: 6},
                { label: 'Potatoes', value: 7},
                { label: 'Squash', value: 8},
                { label: 'Cucumbers', value: 9},
                { label: 'Beans', value: 10},
                { label: 'Garlic', value: 11},
                { label: 'Beets', value: 12}
              ]}
              style={customPickerStyles.inputIOS}
            />
          </View>

          <View style = {styles.inputText}>
            <Text style = {styles.headings}> Average Product Size </Text>
          </View>

          <View style={styles.btnBox}>
            <RadioButtonRN
              data = {buttonData}
              selectedBtn = {(e) => setInput('product_size', e.value)}
              style = {styles.newBtn}
            />

          </View>

          <View style = {styles.headings}>
              <Text style = {styles.headings}> Estimated Pieces of Product </Text>
          </View>

          <View style={styles.inputView} >
          <TextInput
              keyboardType = 'numeric'
              onChangeText={val => setInput('product_quantity', val)}
              style={styles.inputText}
              value = {formState.product_quantity}
              placeholder = "Product Quantity"
              />
          </View>

    { //============================================================================================================================
      // year picker for the graph
      // button doesnt do anything... but the way this is set up atm the datetime picker doesnt work without the button.
    }
    <View>
    <View style={styles.dateButton}>
        <Button onPress={showDatepicker} title="Pick Date!" />
    </View>
      {show && (
        <DateTimePicker
          minimumDate={new Date(2021, 0, 1)}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>

          {/* DATE PICKERS HERE */}

            {/* <View style={styles.inputView} >
              <TextInput
                  onChangeText={val => setInput('timeline_start', val)}
                  style={styles.inputText}
                  value = {formState.timeline_start}
                  placeholder="Timeline Start"
                  />
              </View>

              <View style={styles.inputView} >
              <TextInput
                  onChangeText={val => setInput('timeline_end', val)}
                  style={styles.inputText}
                  value = {formState.timeline_end}
                  placeholder="Timeline End"
                  />
              </View> */}

          <TouchableOpacity title="Create Post" style= {styles.submit} onPress={validate}>
            <Text style = {styles.btnText}> Create Post </Text>
          </TouchableOpacity>

          {/* {

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
    color:"white",
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
    paddingBottom: 200
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
