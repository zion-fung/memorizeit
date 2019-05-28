import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { getMaxStreak, getStreak } from "./storage/storage"
import LinearGradient from "react-native-linear-gradient";

export default class Scores extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maxStreaks: [-1, -1, -1],
            currentStreaks: [-1, -1, -1]
        }
    }
    async componentDidMount() {
        const maxGrid = await getMaxStreak(0)
        const maxPictures = await getMaxStreak(1)
        const maxQuotes = await getMaxStreak(2)
        const maxStreaks = [maxGrid, maxPictures, maxQuotes]
        console.log("maxStreaks:", maxStreaks)
        const grid = await getStreak(0)
        const pictures = await getStreak(1)
        const quotes = await getStreak(2)
        const scores = [grid, pictures, quotes]
        console.log("scores:", scores);
        this.setState({ maxStreaks: maxStreaks, currentStreaks: scores })
    }
    static navigationOptions = {
        headerTintColor: "white",
        headerStyle: { backgroundColor:"#2089dc" },
        headerTitle: "High Scores"
    }
    render() {
        return (
            <LinearGradient colors={["lightcoral", "lightyellow"]}>
                <View style={{ height: "100%" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    </View>
                    <View style={{ flex: 3 }}>
                        <View style={{ flex: 5 }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                                <View>
                                    <View style={styles.space}>
                                        <Text h3>Grid</Text>
                                        <Text h4>longest streak:</Text>
                                        <Text h4>current streak:</Text>
                                    </View>
                                    <View style={styles.space}>
                                        <Text h3>Pictures</Text>
                                        <Text h4>longest streak:</Text>
                                        <Text h4>current streak:</Text>
                                    </View>
                                    <View style={styles.space}>
                                        <Text h3>Quotes</Text>
                                        <Text h4>longest streak:</Text>
                                        <Text h4>current streak:</Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 50 }}>
                                    <View style={styles.space}>
                                        <Text h3></Text>
                                        <Text h4>{this.state.maxStreaks[0]}</Text>
                                        <Text h4>{this.state.currentStreaks[0]}</Text>
                                    </View>
                                    <View style={styles.space}>
                                        <Text h3></Text>
                                        <Text h4>{this.state.maxStreaks[1]}</Text>
                                        <Text h4>{this.state.currentStreaks[1]}</Text>
                                    </View>
                                    <View style={styles.space}>
                                        <Text h3></Text>
                                        <Text h4>{this.state.maxStreaks[2]}</Text>
                                        <Text h4>{this.state.currentStreaks[2]}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    space: {
        marginBottom: 15
    }
})