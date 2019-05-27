import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";

export default class QuotesTutorial extends Component {
    static navigationOptions = {
        title: "Tutorial: Quotes",
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
                    <Text>A window where the quote will appear</Text>
                    <View style={{ backgroundColor: "lightblue", borderColor: "black", borderWidth: 5, width: "71.5%", height: 220, marginTop: 10, marginBottom: 10 }}>
                        <Text h3 style={{ position: "absolute", right: 0, bottom: 0, marginRight: 10, marginBottom: 10 }}>
                            -
                            </Text>
                    </View>
                </View>
                <View style={{ marginTop: 15, marginLeft: 35, marginRight: 35 }}>
                    <Text style={styles.space}>Click this button to start the game:</Text>
                    <Button title="Start" onPress={() => { }} />
                </View>
                <View style={{ marginTop: 15, marginLeft: 35, marginRight: 35 }}>
                    <Text style={styles.space}>Click this button to check your answer (same button):</Text>
                    <Button title="Check" onPress={() => { }} />
                </View>
                <View>
                    <Text h3 style={styles.space}>How to play:</Text>
                    <Text style={styles.space}>Press the start button to start the game. When the game is running, the button title changes to "Check". Once the game starts, memorize the quote and author as fast as you can (punctuation matters, but case does not).</Text>
                    <Text style={styles.space}>Once you have the quote and author memorized, press the check button to see if you are correct. Enter the quote body in "quote text" and the author in "quote author". Press the "Check" button to see if you are correct. A popup will appear telling you if you are correct or not.</Text>
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