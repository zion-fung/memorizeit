import React, { memo } from "react"
import { ScrollView, View } from "react-native"
import { Overlay, Text, Image, Button } from "react-native-elements"
import { Grid, Row, Col } from "react-native-easy-grid"
// const exampleGrid = require("../assets/exampleGrid.png")

function GridTutorial({isVisible, onBackdropPress}) {
    return (
        <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress} height="90%">
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <Text h3 style={{ textDecorationLine: "underline"}}>Tutorial: Grid</Text>
                </View>
                <View>
                    <Text h3>Given:</Text>
                </View>
                <View style={{ alignItems: "center"}}>
                    <Image source={require("../assets/exampleGrid.png")}></Image>
                    <Text h5>A 4x4 Grid. Tapping on a square flips its color.</Text>
                </View>
                <View style={{ marginTop: 15, marginLeft: 35, marginRight: 35 }}>
                    <Text>Click this button to start the game:</Text>
                    <Button title="Start" onPress={() => {}} />
                </View>
                <View style={{ marginTop: 15, marginLeft: 35, marginRight: 35 }}>
                    <Text>Click this button to check your answer (same button):</Text>
                    <Button title="Check" onPress={() => {}} />
                </View>
                <View style={{marginTop: 10}}>
                    <Text h3>How to play:</Text>
                </View>
                <View>
                    <Text style={{marginTop: 10}}>Press the start button to start the game. When the game is running, the title changes to "Check"</Text>
                    <Text style={{marginTop: 10}}>After you press start, you have 5 seconds to remember the pattern on the grid.</Text>
                    <Text style={{marginTop: 10}}>Once the 5 seconds is up, the grid returns to its default colors. Tap on a square to flip its color. Once you believe that you have the correct answer, press the check button again. A popup will come up telling you if you are correct or not.</Text>
                </View>
            </ScrollView>
        </Overlay>
    )
}

export default memo(GridTutorial)