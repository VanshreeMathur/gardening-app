import React, { useState } from 'react';
//import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text,TouchableOpacity, Button, Alert, SafeAreaView, ScrollView } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis} from "victory-native";
import * as queries from '../graphql/queries';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports'
import UserPost from './UserPost';
import RNPickerSelect from 'react-native-picker-select';
Amplify.configure(awsconfig)

var pickerData = [""]; // array that will contain each value selected
var statsData = [0]; // array that will contain each value selected

//****************************************************************************************************************//
// NOTES
// Still need to make a way to choose what style of data to pick, user data vs peterborough data
//ideas ( drop down picker for each option, when you click submit the filters go through an if statement where the data from the picker dictates what style of filters we use)
// still need to figure out what curr user id is so they only see their personal stats.

<<<<<<< HEAD
=======
//========================================================================================================
//DROP DOWN PICKER  (when button is clicked in the stats function it submits the user data from this list to the graph)

var pickerData = [""]; // array that will contain each value selected
pickerDataElement = 0; // counter for elements in array 'pickerData' as well as allows us to populate array
export const Dropdown = () => {
  return (
      <RNPickerSelect
          onValueChange={(value) => (pickerData[pickerDataElement] = value), pickerDataElement += 1/*console.log(value)*/} // sets value in array and goes to next element in array
          items={[
              { label: 'Tomato', value: 'tomato' },
              { label: 'Head of Lettuce', value: 'lettuce' },
              { label: 'Kale', value: 'kale' },
              { label: 'Carrot', value: 'carrot' },
              { label: 'Peppers', value: 'peppers' },
              { label: 'Radish', value: 'radish' },
              { label: 'Potato', value: 'potato' },
              { label: 'Squash', value: 'squash' },
              { label: 'Cucumbers', value: 'cucumber' },
              { label: 'Bean', value: 'bean' },
              { label: 'Garlic', value: 'garlic' },
              { label: 'Beet', value: 'beet' },
          ]}
      />
  );
};
//========================================================================================================

    // Simple query
//const allTodos = await API.graphql(graphqlOperation{ query: queries.listTodos });
//console.log(allTodos);  result: { "data": { "listTodos": { "items": [] } } }
/*
// Query using a parameter
async function productTypeFilter(){
    const productFilter = await API.graphql(graphqlOperation(queries.getTodo, { product_type: 'Cucumber' }));
    console.log(oneTodo);
}




//console.log(oneTodo);

//says client doesnt work
client.query({
    query: gql(listTodos)
  }).then(({ data: { listTodos } }) => {
    console.log(listTodos.items);
  });
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c




//****************************************************************************************************************//
// Graphs for Specific User Data                                                                                  //
// Graph1 type vs quantity, Graph2 type vs Size, Graph3 type vs timeline start                                    //
//****************************************************************************************************************//

<<<<<<< HEAD
//========================================================================================================
//Graph 1 type vs quantity
const usergOneFilter = async function ProductYFilter(){
  try{
    let yfilter = {
      and: [{ product_type: {eq:pickerData[0]}},
      { user_id: {eq:0}}, // THIS NEEDS TO BE CURRENT USER ID NOT 0
    { product_quantity: {ge: 0} }]
       // everything should be available with this filter aka even vegetables you havent grown.
       // the idea of this filter is to allow someone to lookup if they have grown tomatoes eg, and see that they havent without throwing them an error.
      
  }
  const filterYData = await API.graphql({ query: listUserPosts, variables: {filter: yfilter}});
  return filterYData;
  } catch (err) { console.log('Error creating filter.')};
     
  }
  var usergraphOneData = [usergOneFilter.product_quantity]; // please work is the filtered result of products, but we just want to give the graph the quantity to post
  
  //========================================================================================================
  //Graph 2 type vs size
  const usergTwoFilter = async function ProductYFilter(){
    try{
      let yfilter = {
        and: [{ product_type: {eq:pickerData[0]}},
        { user_id: {eq:0}}, // THIS NEEDS TO BE CURRENT USER ID NOT 0
      { product_size: {ge: 0} }]
         // everything should be available with this filter aka even vegetables you havent grown.
         // the idea of this filter is to allow someone to lookup if they have grown tomatoes eg, and see that they havent without throwing them an error.
        
    }
    const filterYData = await API.graphql({ query: listUserPosts, variables: {filter: yfilter}});
    return filterYData;
    } catch (err) { console.log('Error creating filter.')};
       
    }
    var usergraphTwoData = [usergTwoFilter.product_size];
  
  //========================================================================================================
  //Graph 3 type vs timeline start
  const usergThreeFilter = async function ProductYFilter(){
    try{
      let yfilter = {
        and: [{ product_type: {eq:pickerData[0]}},
        { user_id: {eq:0}}, // THIS NEEDS TO BE CURRENT USER ID NOT 0
      { timeline_start: {ge: 0} }]
         // everything should be available with this filter aka even vegetables you havent grown.
         // the idea of this filter is to allow someone to lookup if they have grown tomatoes eg, and see that they havent without throwing them an error.
        
    }
    const filterYData = await API.graphql({ query: listUserPosts, variables: {filter: yfilter}});
    return filterYData;
    } catch (err) { console.log('Error creating filter.')};
       
    }
    var usergraphThreeData = [usergThreeFilter.timeline_start]; // needs to store array data in 12 elements, 0 being january and storing the quantity, 11 being december storing the quantity
=======
//=========================================================
//create a filter for our types of searches
// each graph will use the x filter to guide what type of filter the user wants to see, while the y filter is the comparable. in this case its quantity.
//=========================================================
//This filters our search based on type of product // should filter out any product that is not a tomato or cucumber in this example
async function ProductXFilter(){
    let xfilter = {
      product_quantity: {ge: 0}


    };
   filterXData = await API.graphql({ query: listProducts, variables: {filter: xfilter}}); // gets a list of products with the x filter aka only a list of userposts with cucumbers.
   console.log(filterXData);
}
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c




//****************************************************************************************************************//
// Graphs for Peterborough Data                                                                                   //
// Graph1 type vs quantity, Graph2 type vs Size, Graph3 type vs timeline start                                    //
//****************************************************************************************************************//



//========================================================================================================
//Graph 1 type vs quantity
const gOneFilter = async function ProductYFilter(){
try{
  let yfilter = {
    and: [{ product_type: {eq:pickerData[0]}},
  { product_quantity: {ge: 0} }]
     // everything should be available with this filter aka even vegetables you havent grown.
     // the idea of this filter is to allow someone to lookup if they have grown tomatoes eg, and see that they havent without throwing them an error.

}
const filterYData = await API.graphql({ query: listUserPosts, variables: {filter: yfilter}});
return filterYData;
} catch (err) { console.log('Error creating filter.')};

}
var graphOneData = [gOneFilter.product_quantity]; // please work is the filtered result of products, but we just want to give the graph the quantity to post

//========================================================================================================
//Graph 2 type vs size
const gTwoFilter = async function ProductYFilter(){
  try{
    let yfilter = {
      and: [{ product_type: {eq:pickerData[0]}},
    { product_size: {ge: 0} }]
       // everything should be available with this filter aka even vegetables you havent grown.
       // the idea of this filter is to allow someone to lookup if they have grown tomatoes eg, and see that they havent without throwing them an error.

  }
  const filterYData = await API.graphql({ query: listUserPosts, variables: {filter: yfilter}});
  return filterYData;
  } catch (err) { console.log('Error creating filter.')};

  }
  var graphTwoData = [gTwoFilter.product_size];

//========================================================================================================
//Graph 3 type vs timeline start
const gThreeFilter = async function ProductYFilter(){
  try{
    let yfilter = {
      and: [{ product_type: {eq:pickerData[0]}},
    { timeline_start: {ge: 0}}]      
  }
  const filterYData = await API.graphql({ query: listUserPosts, variables: {filter: yfilter}});
  return filterYData;
  } catch (err) { console.log('Error creating filter.')};
     
  }
  var graphThreeData = [gThreeFilter.timeline_start]; // needs to store array data in 12 elements, 0 being january and storing the quantity, 11 being december storing the quantity



//****************************************************************/
// Graph data creation for Specific User  Stats
const usergraphOneYData = [ // graph one data used for type vs quantity

<<<<<<< HEAD
  {ProductType: 1, ProductQuantity: usergraphOneData},
 
=======
// filter needs to
// 1. select all product type user wants to see, 2. show the product type vs time or vs quantity etc
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c

];

<<<<<<< HEAD
const usergraphTwoYData = [ // graph two data for type vs size 

{ProductType: 1, ProductSize: usergraphTwoData},
=======
//const data = UserPost.map((userPost, index) => (



                //{userPost: product_type, userPost: product_quantity}




           // ))

>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c


];

const usergraphThreeYData = [ // graph two data for type vs timeline start 

{TimelineStart: 1, ProductQuantity: usergraphThreeData},


];
//****************************************************************/
// Graph data creation for Peterborough Stats
const graphOneYData = [ // graph one data used for type vs quantity

    {ProductType: 1, ProductQuantity: graphOneData},


];

const graphTwoYData = [ // graph two data for type vs size

<<<<<<< HEAD
  {ProductType: 1, ProductSize: graphTwoData},
=======
  {ProductType: 1, ProductQuantity: graphTwoYData},
  {ProductType: 2, ProductQuantity: 55},
  {ProductType: 3, ProductQuantity: 200},
  {ProductType: 4, ProductQuantity: 12}

];

const graphThreeYData = [ // graph two data for type vs size
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c


];

<<<<<<< HEAD
const graphThreeYData = [ // graph two data for type vs timeline start 

  {TimelineStart: 1, ProductQuantity: graphThreeData},
  //{TimelineStart: 2, ProductQuantity: graphThreeData[1]},
  //{TimelineStart: 3, ProductQuantity: graphThreeData[2]},
  //{TimelineStart: 4, ProductQuantity: graphThreeData[3]},
  //{TimelineStart: 5, ProductQuantity: graphThreeData[4]},
  //{TimelineStart: 6, ProductQuantity: graphThreeData[5]},
  //{TimelineStart: 7, ProductQuantity: graphThreeData[6]},
  //{TimelineStart: 8, ProductQuantity: graphThreeData[7]},
  //{TimelineStart: 9, ProductQuantity: graphThreeData[8]},
  //{TimelineStart: 10, ProductQuantity: graphThreeData[9]},
  //{TimelineStart: 11, ProductQuantity: graphThreeData[10]},
  //{TimelineStart: 12, ProductQuantity: graphThreeData[11]},
  
=======
// needs to return the drop down list and button first regardless, then do an if statement to return a specific graph based on the user data taken from the drop down list
// the action of pressing the button submits the data from the drop down list.

// ****************
// doesnt work rn because the button and list need to be within a return, but the if else statement needs to be outside of a return, but the code isnt reached if i use a return before
// the if else statement
//********************
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c

];

//****************************************************************************************************************//
// Stats Function ( where we see stuff on screen)                                                                 //              
// Shows submit button (submits contents of ddPicker), drop down picker (list of product)                         //
// Shows 3 graphs, each using data from the user selection on the ddpicker.                                       //
//****************************************************************************************************************//
export default function Stats({navigation}){


  const [pickerResult, setPickerResult] = useState('Cucumbers'); // sets initial state of graph to cucumbers

  // updates graph using drop down lists data
  const updateGraphHandler = () => {
    setPickerResult(pickerData[0]);
  }

 // if() // if we are using product quantity vs type   (if user data == this type of graph)
  {
    return(


//==================================================
// BUTTON FOR SUBMITTING USER DROP DOWN PICKER DATA
//==================================================
<SafeAreaView style={styles.container}>
  <ScrollView style={styles.ScrollView}>



<TouchableOpacity style={styles.profileButtons} onPress = {updateGraphHandler}>
            <Text style={styles.loginText}>Submit</Text>
          </TouchableOpacity>

<<<<<<< HEAD
          <View style={styles.picker}>
      <RNPickerSelect
      pickerProps={{
        title: 'X Axis Options'
      }}
        onValueChange={(value) => (statsData[0] = value)}
        items={[
          { label: 'Your Stats', value: 1},
          { label: 'Peterborough Stats', value: 2},
        ]}
        //style={customPickerStyles.inputIOS}
      />
    </View>
        
=======
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c

<View style={styles.picker}>
      <RNPickerSelect
      pickerProps={{
        title: 'X Axis Options'
      }}
        onValueChange={(value) => (pickerData[0] = value)}
        items={[
<<<<<<< HEAD
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
=======
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
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c
        ]}
        //style={customPickerStyles.inputIOS}
      />
    </View>

<<<<<<< HEAD
    { 
      //============================================================================================================================
      //GRAPH STYLE 1 
      // Y axis is Product_Quantity
      //This graph is used if user selects product_type vs product_quantity
    }
=======
     { // if else statement to decide what graph to use based on what graph style is selected by user...

//============================================================================================================================
//GRAPH STYLE 1
// Y axis is Product_Quantity
//This graph is used if user selects product_type vs product_quantity
}
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c
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

<<<<<<< HEAD
    { 
      //============================================================================================================================
      //GRAPH 2
      // Y axis is Product_Size
      //This graph is used if user selects product_type vs product_size
    }
=======
    </View>
    )
  }
/*
  else if()// product type vs product size  (if user data == this type of graph)
  {
    return(
            //============================================================================================================================
      //GRAPH STYLE 2
      // Y axis is Product_size
      // this graph is used if the user selects product_type vs product_size

>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c

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
<<<<<<< HEAD
    </VictoryChart>    
=======
    </VictoryChart>
    )
  }
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c

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
      <VictoryAxis
      label="Timeline Start"
      style={{axisLabel:{padding: 30}}}
        tickValues={[1,2,3,4,5,6,7,8,9,10,11,12]}
        tickFormat={["J","F","M","A","M","J","J","A","S","O","N","D"]}
      />
      <VictoryAxis
        dependentAxis
<<<<<<< HEAD
        label="Product Quantity"
        style={{axisLabel:{padding: 40}}} 
=======
        label="Timeline Start"
        style={{axisLabel:{padding: 40}}}
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c
        tickFormat={(x) => (`${x / 1}`)} // determines the range on our y axis (change 1000 to change the numbers shown on the y axis)
      />
      <VictoryBar
        data={graphThreeYData}
        x="TimelineStart"
        y="ProductQuantity"
      />
<<<<<<< HEAD
    </VictoryChart>    
    
    </ScrollView>
    </SafeAreaView>
    
=======
    </VictoryChart>
>>>>>>> 6fbe0af4a5153588c93a306449377278519c0c0c
    )
  }

}
















const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    },
    ScrollView:{
          paddingHorizontal: 20
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
