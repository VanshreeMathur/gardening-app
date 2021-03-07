import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button
} from 'react-native'

import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createUserPost } from '../graphql/mutations'
import { listUserPosts } from '../graphql/queries'

import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

const initialState = {user_id: 1, product_type: '', product_size: 0, product_quantity: 0, timeline_start: "", timeline_end: ""};

export default function UserPost(){ 
  
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

    } catch (err) { console.log('Error fetching posts.')};

  }

  async function addUserPost(){

    try{
      const userPost = {...formState};
      setUserPosts([...userPosts, userPost]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createUserPost, {input: userPost}));
      
    } catch (err) {
      console.log('Error creating post:', err);
    }
  }
  
    return (
        <View style={styles.container}>
            
            <Text style={styles.logo}> My Harvest </Text>
            
            <View style={styles.inputView} >
            <TextInput
                onChangeText={val => setInput('product_type', val)}
                style={styles.inputText}
                value={formState.product_type}
                placeholder="Product Type"
                />
            </View>

            <View style={styles.btnBox}>
            
            <Button 
                style={styles.newBtn}
                title="BIG"
                onPress={ () => { setInput('product_size', 0)}}
            />
            
            <Button 
                style={styles.newBtn}
                title="MED"
                onPress={ () => { setInput('product_size', 1)}}
            />

            <Button 
                style={styles.newBtn}
                title="SML"
                onPress={ () => { setInput('product_size', 3)}}
            />
            </View>

            <View style={styles.inputView} >
            <TextInput
                onChangeText={val => setInput('product_quantity', val)}
                style={styles.inputText}
                value = {formState.product_quantity}
                placeholder = "Product Quantity"
                />
            </View>
            
            <View style={styles.inputView} >
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
            </View>

            <Button title="Create Post" onPress={addUserPost} />
            {

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
            }
        </View>
    )    
}

const styles = StyleSheet.create({
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
    paddingBottom: 20
  },
  newBtn: {
    width: 80,
    height: 80,
    backgroundColor: '#D67A46',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText:{
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#29A86B',
    alignItems: 'center',
    justifyContent: 'center',
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