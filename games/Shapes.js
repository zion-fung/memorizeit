import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const emoticons = ["emoticon-happy-outline", "emoticon-neutral-outline", "emoticon-sad-outline", "emoticon-wink-outline"]
let timeout = null
export default class Shapes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: [],
            displayEmoticon: "emoticon-happy-outline",
            gameIsActive: false,
            gameTitle: "Press the emoticon to start!",
            solution: []
        }
    }
    componentWillUnmount() {
        clearTimeout(timeout)
    }
    static navigationOptions = {
        header: null
    }
    addUserEmoticon(index) {
        if(!this.state.gameIsActive) {
            return
        }
        let userInput = this.state.userInput
        const length = userInput.length
        if(length == 12) {
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
    clearUserInput() {
        this.setState({
            userInput: []
        })
    }
    startGame() {
        if(!this.state.gameIsActive) {
            this.setState({
                gameTitle: "Memorize!",
                gameIsActive: true,
                displayEmoticon: ""
            })
            let solution = []
            for(let i = 0;i < 5;i++) {
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
                    if(i < 5) {
                        timeout = setTimeout(run)
                    } else {
                        that.setState({
                            gameTitle: "Enter the sequence!"
                        })
                    }
                }, 600)
            }, 500)
        }
    }
    submitUserInput() {
        if(this.state.gameIsActive) {
            // console.log(this.state.userInput)
            // Check userInput against solution
            let userInput = this.state.userInput
            let solution = this.state.solution
            this.setState({
                gameTitle: "Press the emoticon to start!",
                gameIsActive: false,
                displayEmoticon: "emoticon-happy-outline",
                userInput: []
            })
            if(userInput.length !== solution.length) {
                alert("You were incorrect...\nMaybe next time!")
                return
            }
            for(let i = 0;i < userInput.length;i++) {
                if(userInput[i].props.name !== solution[i]) {
                    alert("You were incorrect...\nMaybe next time!")
                    return
                }
            }
            alert("You were correct! Congratulations!")
        }
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <Grid style={{ backgroundColor: "#e2dd7c"}}>
                <Row size={1}>
                    <Col size={1} style={{margin: 15}}>
                        <Icon
                            name="home"
                            size={50}
                            color="black"
                            reverse
                            onPress={() => navigate("Home")}
                        />
                    </Col>
                    <Col size={5}></Col>
                    <Col size={1} style={{margin: 15}}>
                        <Icon style={{position: "absolute", right: 0}}
                            size={50}
                            name="help"
                            raised
                            color="#ea4c33"
                        />
                    </Col>
                </Row>
                <Row size={1} style={{alignItems: "center", justifyContent: "center"}}>
                    <Text h3>{this.state.gameTitle}</Text>
                </Row>
                <Row size={3}>
                    <Col size={1} style={{justifyContent: "center", alignItems: "center"}}>
                        <Icon
                            color="red"
                            name="close"
                            size={50}
                            onPress={() => this.clearUserInput()}
                        />
                    </Col>
                    <Col size={3} style={{ borderColor: "black", borderWidth: 5, backgroundColor: "lightblue", justifyContent: "center", alignItems: "center" }}>
                        {this.state.displayEmoticon === "" ? <View></View>: <Icon 
                            color="black"
                            name={this.state.displayEmoticon}
                            size={120}
                            onPress={() => this.startGame()}
                        />}
                    </Col>
                    <Col size={1} style={{justifyContent: "center", alignItems: "center"}}>
                        <Icon 
                            color="green"
                            name="check"
                            size={50}
                            onPress={() => this.submitUserInput()}
                        />
                    </Col>
                </Row>
                <Row size={2} style={{paddingLeft: 15, paddingTop: 15, marginLeft: 15, marginRight: 15, marginTop: 15, backgroundColor: "#8ebee5", flexWrap: "wrap"}} >
                    {this.state.userInput}
                </Row>
                <Row size={2}>
                    <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Icon 
                            color="black"
                            name="emoticon-happy-outline"
                            size={70}
                            onPress={() => this.addUserEmoticon(0)}
                        />
                    </Col>
                    <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Icon 
                            color="black"
                            name="emoticon-neutral-outline"
                            size={70}
                            onPress={() => this.addUserEmoticon(1)}
                        />
                    </Col>
                    <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Icon 
                            color="black"
                            name="emoticon-sad-outline"
                            size={70}
                            onPress={() => this.addUserEmoticon(2)}
                        />
                    </Col>
                    <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Icon 
                            color="black"
                            name="emoticon-wink-outline"
                            size={70}
                            onPress={() => this.addUserEmoticon(3)}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}