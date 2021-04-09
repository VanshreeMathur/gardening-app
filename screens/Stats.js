import React, { useState } from 'react';
//import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text,TouchableOpacity, Button, Alert } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis} from "victory-native";
import * as queries from '../graphql/queries';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports'
import UserPost from './UserPost';
import RNPickerSelect from 'react-native-picker-select';
Amplify.configure(awsconfig)



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
              { label: 'Lettuce', value: 'lettuce' },
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

*/
// Create an arrays for the filtered data




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







//========================================================================================================
// pretty sure this works
const pleaseWork = async function ProductYFilter(){
try{
  let yfilter = {
    and: [{ product_type: {eq:pickerData[0]}},
  { product_quantity: {ge: 0} }]
     // everything should be available with this filter aka even vegetables you havent grown.
     // the idea of this filter is to allow someone to lookup if they have grown tomatoes eg, and see that they havent without throwing them an error.
    
}
const filterYData = await API.graphql({ query: listProducts, variables: {filter: yfilter}});
return filterYData;
} catch (err) { console.log('Error creating filter.')};
   
}
//========================================================================================================


//========================================================================================================
//TESTING OUT FILTERING PROPERTIES
const test = async function testingMultipleFilters(){
  //takes array and creates a filter for each element in array
  try{
    let testFilter = {
      and: [{ product_type: {eq:pickerData[0]}},
    { product_quantity: {ge: 0} }]
       // everything should be available with this filter aka even vegetables you havent grown.
       // the idea of this filter is to allow someone to lookup if they have grown tomatoes eg, and see that they havent without throwing them an error.
      
  }
  const filterYData = await API.graphql({ query: listProducts, variables: {filter: yfilter}});
  return filterYData;
  } catch (err) { console.log('Error creating filter.')};
     
  }


//=========================================================
//Now that the filters are created, this array is where we store the data from the query we actually want to put into the graph
// FOR GRAPH 1
//=========================================================

var graphOneData = [pleaseWork.product_quantity]; // please work is the filtered result of products, but we just want to give the graph the quantity to post
console.log("pickerData[0]");
console.log("Quantity of Cucumbers is:", pickerData[0].product_quantity); // produces response "undefined" currently, most likely because user posts dont work rn so no data in database






//console.log(filterYData);
   // const data = filteredData;

// filter needs to 
// 1. select all product type user wants to see, 2. show the product type vs time or vs quantity etc 


//const data = UserPost.map((userPost, index) => (
                
               
            
                //{userPost: product_type, userPost: product_quantity}
               
               
             

           // ))
            


//const data = [listUserPosts(items(filter))];


//=========================
// NOTE: try to make it so we make one graph and one graph data, which is taken from the drop down list and filtered.


const graphOneYData = [ // graph one data used for type vs quantity

    {ProductType: 1, ProductQuantity: graphOneData},
   

];

const graphTwoYData = [ // graph two data for type vs size 

  {ProductType: 1, ProductQuantity: graphTwoYData},
  {ProductType: 2, ProductQuantity: 55},
  {ProductType: 3, ProductQuantity: 200},
  {ProductType: 4, ProductQuantity: 12}

];

const graphThreeYData = [ // graph two data for type vs size 

  {ProductType: 1, ProductQuantity: graphThreeYData},
  {ProductType: 2, ProductQuantity: 55},
  {ProductType: 3, ProductQuantity: 200},
  {ProductType: 4, ProductQuantity: 12}

];

// needs to return the drop down list and button first regardless, then do an if statement to return a specific graph based on the user data taken from the drop down list
// the action of pressing the button submits the data from the drop down list. 

// ****************
// doesnt work rn because the button and list need to be within a return, but the if else statement needs to be outside of a return, but the code isnt reached if i use a return before
// the if else statement
//******************** 


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
<View style={styles.container}>
<TouchableOpacity style={styles.profileButtons} onPress = {updateGraphHandler}>
            <Text style={styles.loginText}>Submit</Text>
          </TouchableOpacity>
        

<View style={styles.picker}>
      <RNPickerSelect
      pickerProps={{
        title: 'X Axis Options'
      }}
        onValueChange={(value) => (pickerData[0] = value)}
        items={[
          { label: 'Tomatoes', value: 0},
          { label: 'Lettuce', value: 1},
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

     { // if else statement to decide what graph to use based on what graph style is selected by user...

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
        tickFormat={[pickerData[0]]}
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


      <VictoryChart
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={{x: 40}}
    >
      <VictoryAxis
      label="Product Type"
      style={{axisLabel:{padding: 30}}}
        tickValues={[1, 2, 3, 4]}
        tickFormat={["Vegetable 1", "Vegetable 2", "Vegetable 3", "Vegetable 4"]}
      />
      <VictoryAxis
        dependentAxis
        label="Product Size"
        style={{axisLabel:{padding: 40}}} 
        tickFormat={(x) => (`${x / 1}`)} // determines the range on our y axis (change 1000 to change the numbers shown on the y axis)
      />
      <VictoryBar
        data={graphTwoData}
        x="ProductType"
        y="ProductQuantity"
      />
    </VictoryChart>    
    )
  }

  else if() // product type vs timeline start (if user data == this type of graph)
  {
    return(
          //============================================================================================================================
      //GRAPH STYLE 3
      // this graph is used if the user selects product_type vs timeline_start


      <VictoryChart
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={{x: 40}}
    >
      <VictoryAxis
      label="Product Type"
      style={{axisLabel:{padding: 30}}}
        tickValues={[1, 2, 3, 4]}
        tickFormat={["Vegetable 1", "Vegetable 2", "Vegetable 3", "Vegetable 4"]}
      />
      <VictoryAxis
        dependentAxis
        label="Timeline Start"
        style={{axisLabel:{padding: 40}}} 
        tickFormat={(x) => (`${x / 1}`)} // determines the range on our y axis (change 1000 to change the numbers shown on the y axis)
      />
      <VictoryBar
        data={graphThreeData}
        x="ProductType"
        y="ProductQuantity"
      />
    </VictoryChart>    
    )
  }
    */
}






 









const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
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