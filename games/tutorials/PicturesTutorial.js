import React, { Component } from "react"
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default class PicturesTutorial extends Component {
    static navigationOptions = {
        title: "Tutorial: Pictures",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#2089dc" }
    }
    render() {
        return (
            <ScrollView style={{ margin: 10, flex: 1 }}>
                <View>
                    <Text h3>Given:</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text>A window where the emoticons appear</Text>
                    <View style={{ backgroundColor: "lightblue", borderColor: "black", borderWidth: 5, width: "71.5%", height: 220, marginTop: 10, marginBottom: 10 }}></View>
                </View>
                <View style={{ marginTop: 15, marginLeft: 35, marginRight: 35 }}>
                    <Text style={styles.space}>Click this button to start the game:</Text>
                    <Button title="Start" onPress={() => { }} />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text h4>These are the 4 possible emoticons:</Text>
                </View>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "center" }}>
                    <Icon name="emoticon-happy-outline" size={60} color="black" />
                    <Icon name="emoticon-neutral-outline" size={60} color="black" />
                    <Icon name="emoticon-sad-outline" size={60} color="black" />
                    <Icon name="emoticon-wink-outline" size={60} color="black" />
                </View>
                <View>
                    <Text h3 style={styles.space}>How to play:</Text>
                    <Text style={styles.space}>Press the start button to start the game.</Text>
                    <Text style={styles.space}>After you press start, 5 emoticons will flash in a sequence in the window. Memorize the order that they appear in.</Text>
                    <Text style={styles.space}>Once all the emoticons have appeared, you will be taken to the another screen to enter your answer. Press the emoticons at the bottom to enter your answer. When you think you have it right, press the submit button. A popup will appear telling you if you were correct or not.</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    space: {
        marginTop: 10,
        marginBottom: 10
    }
})