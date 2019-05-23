import React, { Component } from "react";
import { View } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Text, Overlay, Button, Header, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const emoticons = ["emoticon-happy-outline", "emoticon-neutral-outline", "emoticon-sad-outline", "emoticon-wink-outline"]
let timeout = null
export default class Pictures extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: [],
            displayEmoticon: "",
            gameIsActive: false,
            gameTitle: "Press start!",
            solution: [],
            showAnswerOverlay: false,
            actionButtonTitle: "Start"
        }
    }
    componentWillUnmount() {
        clearTimeout(timeout)
    }
    static navigationOptions = {
        headerRight: <Icon style={{ position: "absolute", right: 10 }}
            size={40}
            name="help"
            raised
            color="white"
        />,
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#2089dc" }
    }
    addUserEmoticon(index) {
        // if (!this.state.gameIsActive) {
        //     return
        // }
        let userInput = this.state.userInput
        const length = userInput.length
        if (length == 12) {
            return
        }
        userInput.push(
            <Icon
                key={length.toString()}
                name={emoticons[index]}
                size={50}
                color="black"
            />
        )
        this.setState({
            userInput: userInput
        })
    }
    startGame() {
        if (!this.state.gameIsActive) {
            this.setState({
                gameTitle: "Memorize!",
                gameIsActive: true,
                displayEmoticon: "",
                actionButtonTitle: "Check"
            })
            let solution = []
            for (let i = 0; i < 5; i++) {
                let random = Math.floor(Math.random() * 4)
                solution.push(emoticons[random])
            }
            console.log("solution:", solution)
            this.setState({
                solution: solution
            })
            i = 0
            let that = this
            timeout = setTimeout(function run() {
                that.setState({
                    displayEmoticon: solution[i]
                })
                timeout = setTimeout(() => {
                    that.setState({
                        displayEmoticon: ""
                    })
                }, 450)
                timeout = setTimeout(() => {
                    i += 1
                    if (i < 5) {
                        timeout = setTimeout(run)
                    } else {
                        that.setState({
                            gameTitle: "Enter the sequence!"
                        })
                    }
                }, 600)
            }, 500)
        } else {
            this.setState({
                showAnswerOverlay: true
            })
        }
    }
    submitUserInput() {
        if (this.state.gameIsActive) {
            // console.log(this.state.userInput)
            // Check userInput against solution
            let userInput = this.state.userInput
            let solution = this.state.solution
            if (userInput.length !== solution.length) {
                alert("You were incorrect...\nTry again!")
                return
            }
            for (let i = 0; i < userInput.length; i++) {
                if (userInput[i].props.name !== solution[i]) {
                    alert("You were incorrect...\nTry again!")
                    return
                }
            }
            alert("You were correct! Congratulations!")
            this.setState({
                gameTitle: "Press start!",
                gameIsActive: false,
                displayEmoticon: "",
                userInput: [],
                showAnswerOverlay: false,
                actionButtonTitle: "Start"
            })
        }
    }
    clearOverlay() {
        this.setState({
            showAnswerOverlay: false,
            userInput: []
        })
    }
    render() {
        return (
            <Grid style={{ backgroundColor: "#e2dd7c" }}>
                <Overlay isVisible={this.state.showAnswerOverlay} onBackdropPress={() => this.clearOverlay()} height="90%" width="90%">
                    <Grid>
                        <Header
                            leftComponent={
                                <Icon
                                    name="arrow-left"
                                    color="white"
                                    size={30}
                                    onPress={() => this.clearOverlay()}
                                />
                            }
                            centerComponent={
                                <Text h4 style={{ color: "white" }}>Submit Answer</Text>
                            }
                        />
                        <Row size={3} style={{ paddingTop: 10, paddingRight: 10, paddingLeft: 10, paddingBottom: 15, flexWrap: "wrap", borderColor: "gray", borderWidth: 2, margin: 10 }} >
                            {this.state.userInput}
                        </Row>
                        <Row size={1}>
                            <Col size={4}>
                                <Button
                                    title="Clear"
                                    buttonStyle={{backgroundColor: "red"}}
                                    onPress={() => this.setState({userInput: []})}
                                />
                            </Col>
                            <Col size={1}></Col>
                            <Col size={4}>
                                <Button
                                    title="Submit"
                                    buttonStyle={{backgroundColor: "green"}}
                                    onPress={() => this.submitUserInput()}
                                />
                            </Col>
                        </Row>
                        <Row size={1} style={{justifyContent: "center", alignItems: "flex-end"}}>
                            <Text h4>Press the emoticons!</Text>
                        </Row>
                        <Row size={2}>
                            <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    color="black"
                                    name="emoticon-happy-outline"
                                    size={70}
                                    onPress={() => this.addUserEmoticon(0)}
                                    style={{backgroundColor: "#fffaa3", borderRadius: 40}}
                                />
                            </Col>
                            <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    color="black"
                                    name="emoticon-neutral-outline"
                                    size={70}
                                    onPress={() => this.addUserEmoticon(1)}
                                    style={{backgroundColor: "#fffaa3", borderRadius: 40}}
                                />
                            </Col>
                            <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    color="black"
                                    name="emoticon-sad-outline"
                                    size={70}
                                    onPress={() => this.addUserEmoticon(2)}
                                    style={{backgroundColor: "#fffaa3", borderRadius: 40}}
                                />
                            </Col>
                            <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    color="black"
                                    name="emoticon-wink-outline"
                                    size={70}
                                    onPress={() => this.addUserEmoticon(3)}
                                    style={{backgroundColor: "#fffaa3", borderRadius: 40}}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </Overlay>
                <Row size={1} style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text h3>{this.state.gameTitle}</Text>
                </Row>
                <Row size={3}>
                    <Col size={1}></Col>
                    <Col size={5} style={{ borderColor: "black", borderWidth: 5, backgroundColor: "lightblue", justifyContent: "center", alignItems: "center" }}>
                        {this.state.displayEmoticon === "" ? <View></View> : <Icon
                            color="black"
                            name={this.state.displayEmoticon}
                            size={150}
                        />}
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={1}></Row>
                <Row size={1}>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <Button title={this.state.actionButtonTitle} onPress={() => this.startGame()} />
                    </Col>
                    <Col size={1}></Col>
                </Row>
            </Grid>
        )
    }
}