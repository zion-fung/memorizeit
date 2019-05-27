import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Button, Text } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

let didBlurSubscription = null
let didFocusSubscription = null
class Home extends Component {
    constructor(props) {
        super(props)
        let nums = []
        let anims = []
        let fadeOutTiming = []
        let fadeInTiming = []
        for (let i = 0; i < 12; i++) {
            let random = Math.floor(Math.random() * 10)
            nums.push(random)
            anims.push(new Animated.Value(0.99))
            fadeOutTiming.push(Animated.timing(anims[i], { toValue: 0, duration: 500, useNativeDriver: true }))
            fadeInTiming.push(Animated.timing(anims[i], { toValue: 0.99, duration: 500, useNativeDriver: true }))
        }
        let timings = fadeOutTiming.concat(fadeInTiming)
        this.state = {
            nums: nums,
            fadeAnim: anims,
            timings: timings,
            animation: null,
            sequence: null
        }
        didBlurSubscription = this.props.navigation.addListener(
            'didBlur',
            () => {
                // console.debug('didBlur');
                // console.debug(this.state.animation)
                // console.debug(this.state.sequence)
                this.state.sequence.stop()
            }
        );
        didFocusSubscription = this.props.navigation.addListener(
            "didFocus",
            () => {
                // console.log("didFocus")
                this.state.animation = Animated.loop(
                    this.state.sequence = Animated.sequence(timings)
                ).start()
            }
        )
    }
    componentWillUnmount() {
        didBlurSubscription.remove()
        didFocusSubscription.remove()
    }
    static navigationOptions = {
        header: null
    }
    render() {
        const { navigate } = this.props.navigation

        return (
            <LinearGradient colors={["lightyellow", "lightcoral"]}>
                <Icon name="brain" color="black" size={160} style={{ position: "absolute", right: 0, top: 0, opacity: 0.5 }} />
                <Icon name="thought-bubble-outline" size={160} style={{ position: "absolute" }} />
                <View
                    style={{ flexDirection: "column", display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}
                >
                    <View
                        style={{ flexGrow: 4, justifyContent: "flex-end" }}
                    >
                        <Text h3
                        >
                            Memorize It
                            </Text>
                    </View>
                    <View
                        style={{
                            flexGrow: 4,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                        <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", marginLeft: 15, marginRight: 15 }}>
                            {
                                this.state.nums.map((item, index) => {
                                    return <Animated.View key={index.toString()}
                                        style={{ opacity: this.state.fadeAnim[index] }}>
                                        <Text h1 >{item}</Text>
                                    </Animated.View>
                                })
                            }

                        </View>
                    </View>
                    <View
                        style={{ flexGrow: 1, width: "66%" }}
                    >
                        <Button
                            raised
                            title="Play"
                            onPress={() => navigate("GameSelection")}
                        />
                    </View>
                    <View
                        style={{ flexGrow: 1, width: "66%" }}
                    >
                        <Button
                            raised
                            title="Scores"
                            onPress={() => navigate("Scores")}
                        />
                    </View>
                    <View style={{ flexGrow: 1 }}></View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    grid: {
        backgroundColor: "lightyellow"
    },
    topHalf: {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Home;