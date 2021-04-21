import React, { useEffect, useState, useCallback } from 'react';
//import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text,TouchableOpacity, Button, Alert, SafeAreaView, ScrollView} from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel} from "victory-native";
import * as queries from '../graphql/queries';
import { listUserPosts } from '../graphql/queries'
import { Amplify, API, Auth, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports'
import UserPost from './UserPost';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { mayInitWithUrlAsync } from 'expo-web-browser';
Amplify.configure(awsconfig)

var pickerData = ["0"]; // array that will contain each value selected
var statsData = [0]; // array that will contain each value selected
var datePickerYear = [0]; // stores the year that is selected within the date picker

//****************************************************************************************************************//
// NOTES
// Still need to make a way to choose what style of data to pick, user data vs peterborough data
// ideas ( drop down picker for each option, when you click submit the filters go through an if statement where the data from the picker dictates what style of filters we use)
// still need to figure out what curr user id is so they only see their personal stats.



//****************************************************************************************************************//
// Stats Function ( where we see stuff on screen)                                                                 //
// Shows submit button (submits contents of ddPicker), drop down picker (list of product)                         //
// Shows 3 graphs, each using data from the user selection on the ddpicker.                                       //
//****************************************************************************************************************//
export default function Stats({navigation}){

  const [filteredData, setFilteredData] = useState([]);
  const [pickerResult, setPickerResult] = useState('Cucumbers'); // sets initial state of graph to cucumbers

  useEffect(() => {
    ProductYFilter()
  }, [])










//****************************************************************************************************************//
//TESTING fetch stuff
const [userPosts, setUserPosts] = useState([]);
const [currUserName, setCurrUserName] = useState([]);

  useEffect(() => {
    fetchUserPosts()
  }, [])

  useEffect(() => {
    fetchUserName()
  }, [])


//====================
//Setting up Date Picker
const [date, setDate] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(true);
datePickerYear = date.getFullYear(); // this gets the year that is selected in the date picker

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

async function fetchUserPosts(){

  try{

    const userPostData = await API.graphql(graphqlOperation(listUserPosts));
    const userPosts = userPostData.data.listUserPosts.items;
    setUserPosts(userPosts);

  } catch (err) { {/*console.log('Error fetching posts.') */}};

}

async function fetchUserName(){

  try{
/*
    Auth.currentUserInfo()
    .then(data => console.log(data.id) );*/

    const { username } = await Auth.currentAuthenticatedUser();
    const currUserName = username;
    setCurrUserName(currUserName);


  } catch (err) { {/*console.log('Error fetching posts.') */}};

}
console.log(currUserName);


  // updates graph using drop down lists data
  const updateGraphHandler = () => {
    setPickerResult(pickerData[0]);
  }


//****************************************************************************************************************//
// Graph filters for Peterborough Data                                                                            //
// Graph1 type vs quantity, Graph2 type vs Size, Graph3 type vs timeline start                                    //
//****************************************************************************************************************//
//========================================================================================================
async function ProductYFilter(){
  try{

    let yfilter = {
      and: [{ product_type: {eq: pickerData[0]}},
    { product_quantity: {ge: 0} }]
  }
  const filterYData = await API.graphql({ query: listUserPosts, variables: {filter: yfilter}});
  const filteredData = filterYData.data.listUserPosts.items;
  setFilteredData(filteredData);
  return filterYData;
  } catch (err) { console.log('Error creating filter.')};

  }

    var filterQuantityData = [filteredData.product_quantity]; // please work is the filtered result of products, but we just want to give the graph the quantity to post
    var filterTimeData = [filteredData.timeline_start];
    var filterSizeData = [filteredData.product_size];


 // console.log("THIS:",filteredData[0,0])


//****************************************************************/
// Graph data creation for all stats, filters are named the same but the result of the ddpicker decides what type of filter gets used

const graphOneYData = [ // graph one data used for type vs quantity
  {ProductType: 1, ProductQuantity: userPosts /*filterQuantityData*/},


];

const graphTwoYData = [ // graph two data for type vs size

{ProductType: 1, ProductSize: filterSizeData},


];

const graphThreeYData = [ // graph two data for type vs timeline start
{TimelineStart: 1, ProductQuantity: 2},
//{TimelineStart: 1, ProductQuantity: filterTimeData},
{TimelineStart: 2, ProductQuantity:4},
{TimelineStart: 3, ProductQuantity: 16},
{TimelineStart: 4, ProductQuantity: 100},
{TimelineStart: 5, ProductQuantity: 1},
{TimelineStart: 6, ProductQuantity: 55},
{TimelineStart: 7, ProductQuantity: 12},
{TimelineStart: 8, ProductQuantity: 12},
{TimelineStart: 9, ProductQuantity: 0},
{TimelineStart: 10, ProductQuantity: 99},
{TimelineStart: 11, ProductQuantity: 14},
{TimelineStart: 12, ProductQuantity: 300},


];

 //******************************************************************************************************************************************************************//
 // RETURN STARTS                                                     RETURN STARTS                                                               RETURN STARTS      //
 //******************************************************************************************************************************************************************//

 // if() // if we are using product quantity vs type   (if user data == this type of graph)
  {
    return(


//==================================================
// BUTTON FOR SUBMITTING USER DROP DOWN PICKER DATA
//==================================================
<SafeAreaView style={styles.container}>
<ScrollView contentContainerStyle={{flexGrow: 1, justifyContent:'center',alignItems: 'center'}}>

<TouchableOpacity style={styles.profileButtons} onPress = {updateGraphHandler}>
            <Text style={styles.loginText}>Submit</Text>
          </TouchableOpacity>

          <View style={styles.picker}>
      <RNPickerSelect
      pickerProps={{
        title: 'X Axis Options'
      }}
        onValueChange={(value) => (statsData[0] = value)}
        items={[
          { label: 'Your Stats', value: 0},
          { label: 'Peterborough Stats', value: 1},
        ]}
        //style={customPickerStyles.inputIOS}
      />
    </View>


<View style={styles.picker}>
      <RNPickerSelect
      pickerProps={{
        title: 'X Axis Options'
      }}
        onValueChange={(value) => (pickerData[0] = value)}
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
        //style={customPickerStyles.inputIOS}
      />
    </View>
    {//============================================================================================================================
      // year picker for the graph
      // button doesnt do anything... but the way this is set up atm the datetime picker doesnt work without the button.
    }
    <View>
    <View>
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

    <View style={styles.graphContainer}>
    {
      //============================================================================================================================
      //GRAPH STYLE 1
      // Y axis is Product_Quantity
      //This graph is used if user selects product_type vs product_quantity
    }
      <VictoryChart
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={{x: 40}}
    >
      <VictoryAxis
      label="Product Type"
      style={{axisLabel:{padding: 30}}}
        tickValues={[1]}
        tickFormat={[""]}
      />
      <VictoryAxis
        dependentAxis
        label="Product Quantity"
        style={{axisLabel:{padding: 40}}}
        tickFormat={(x) => (`${x / 1}`)} // determines the range on our y axis (change 1000 to change the numbers shown on the y axis)
      />
      <VictoryBar
        data={graphOneYData}
        x="ProductType"
        y="ProductQuantity"
      />
    </VictoryChart>
    </View>
    {
      //============================================================================================================================
      //GRAPH 2
      // Y axis is Product_Size
      //This graph is used if user selects product_type vs product_size
    }

    <VictoryChart
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={{x: 40}}
    >
      <VictoryAxis
      label="Product Type"
      style={{axisLabel:{padding: 30}}}
        tickValues={[1]}
        tickFormat={[""]}
      />
      <VictoryAxis
        dependentAxis
        label="Product Size"
        style={{axisLabel:{padding: 40}}}
        tickFormat={(x) => (`${x / 1}`)} // determines the range on our y axis (change 1000 to change the numbers shown on the y axis)
      />
      <VictoryBar
        data={graphTwoYData}
        x="ProductType"
        y="ProductSize"
      />
    </VictoryChart>


    {
      //============================================================================================================================
      //GRAPH 3
      // Y axis is timeline_start
      //This graph is used if user selects product_quantity vs timelinestart of a specific product type
      // displays max 12 bars (12 months) xaxis is months yaxis is quantity, drop down list determines the product type
    }
   <VictoryChart
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={{x: 40}}
      //scale={{x: ""}}
    >
      <VictoryLabel text={datePickerYear} x={185} y={30} textAnchor="middle"/>
      <VictoryAxis
      label="Months"
      style={{axisLabel:{padding: 30}}}
        tickValues={[1,2,3,4,5,6,7,8,9,10,11,12]}
        tickFormat={["J","F","M","A","M","J","J","A","S","O","N","D"]}
      />
      <VictoryAxis
        dependentAxis
        label="Product Quantity"
        style={{axisLabel:{padding: 40}}}
        tickFormat={(x) => (`${x / 1}`)} // determines the range on our y axis (change 1000 to change the numbers shown on the y axis)
      />
      <VictoryBar
        data={graphThreeYData}
        x="TimelineStart"
        y="ProductQuantity"
      />
    </VictoryChart>

    </ScrollView>
    </SafeAreaView>

    )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
        backgroundColor: '#29A86B'
    },
    graphContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff",

  },
    ScrollView:{
          paddingHorizontal: 20,
    },
    loginBtn:{
      width:"50%",
      backgroundColor:"#EE7729",
      borderRadius:15,
      height:50,
      paddingHorizontal: 20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
      },
      loginText:{
        color:"white",
        },
        profileButtons:{
          width:"75%",
          backgroundColor:"#202b30",
          borderRadius:15,
          height:50,
          alignItems:"center",
          justifyContent:"center",
          marginTop:20,
          marginBottom:10
          },
          picker: {
            width:"80%",
            backgroundColor:"#ffffff",
            borderRadius:15,
            height:50,
            marginBottom:20,
            justifyContent:"center",
            padding:20,
          }
});