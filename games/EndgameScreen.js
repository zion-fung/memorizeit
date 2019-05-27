import React, { Component } from "react"
import { Overlay, Text, Button } from "react-native-elements"
import { getStreak, getMaxStreak } from "../storage/storage"
import { View } from "react-native"

export default class EndgameScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStreak: 0,
            maxStreak: 0
        }
    }
    async componentDidMount() {
        const streak = await getStreak(this.props.keyId)
        const max = await getMaxStreak(this.props.keyId)
        this.setState({ currentStreak: streak, maxStreak: max })
    }
    render() {
        return (
            <Overlay isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress}>
                <View>
                    <View style={{ alignItems: "flex-start" }}>
                        <Button title="X" type="clear" onPress={this.props.onBackdropPress} />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text h3>{this.props.message}</Text>
                        <Text h4>Longest streak: {this.state.maxStreak}</Text>
                        <Text h4>Current streak: {this.state.currentStreak}</Text>
                    </View>
                </View>
            </Overlay>
        )
    }
}