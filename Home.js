import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default class Home extends Component {
    render() {
        const { navigate } = this.props.navigation
        return(
            <View>
                <Button title="GridMemorization" onPress={() => navigate("GridMemorization")} />
                <Icon 
                    name="md-home"
                    color="black"
                    reverse
                    size={50}
                    onPress={() => console.log("Test")}
                />
            </View>
        )
    }
}