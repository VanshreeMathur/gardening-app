import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis} from "victory-native";

const data = [

  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }

];


export default function Stats(){
    return(
        <View style={styles.container}>
            <VictoryChart domainPadding={20} width={350} theme={VictoryTheme.material}> 
                <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});