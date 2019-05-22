import React, { Component } from "react";
import { View } from "react-native";
import { Icon, Button, Text } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

export default class GameSelection extends Component {
    static navigationOptions = {
        headerTintColor: "white",
        headerStyle: { backgroundColor:"#2089dc" }
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <LinearGradient colors={["lightyellow", "lightcoral"]}>
                <Icon
                    name="grid"
                    type="material-community"
                    iconStyle={{ position: "absolute", left: 15, top: 15, transform: [{rotateZ: "-20deg"}] }}
                    size={70}
                />
                <Icon
                    name="format-quote-open"
                    iconStyle={{ position: "absolute", left: "40%", top: 15, transform: [{rotateZ: "-5deg"}] }}
                    size={70}
                    type="material-community"
                />
                <Icon
                    name="emoticon-happy-outline"
                    iconStyle={{ position: "absolute", right: 15, top: 15, transform: [{rotateZ: "10deg"}] }}
                    size={70}
                    type="material-community"
                />
                <View style={{ height: "100%", flexDirection: "column" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 4 }}>
                        <Text h2>Games</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <View style={{ width: "66%" }}>
                            <Button
                                title="Grid"
                                raised
                                onPress={() => navigate("GridMemorization")}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <View style={{ width: "66%" }}>
                            <Button
                                title="Pictures"
                                raised
                                onPress={() => navigate("Pictures")}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <View style={{ width: "66%" }}>
                            <Button
                                title="Quotes"
                                raised
                                onPress={() => navigate("Quotes")}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </LinearGradient>
        )
    }
}