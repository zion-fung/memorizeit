import React, { Component } from "react";
import { View } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Text, Overlay, Button, Header } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import EndgameScreen from "./EndgameScreen"
import { incrementStreak, resetStreak, getStreak, getMaxStreak } from "../storage/storage"
import { picturesDifficulty } from "./difficulty/difficulty"

// Get preferences
const prefs = require("../storage/prefs").prefs
const emoticons = ["emoticon-happy-outline", "emoticon-neutral-outline", "emoticon-sad-outline", "emoticon-wink-outline"]
let timeout = null
const winMessage = prefs.pictures.winMessage
const loseMessage = prefs.pictures.loseMessage
const STORAGE_KEY = prefs.pictures.STORAGE_KEY
let pictureExistence = prefs.pictures.pictureExistence
let pictureInterval = prefs.pictures.pictureInterval
let sequenceDelay = prefs.pictures.sequenceDelay

export default class Pictures extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: [],
            displayEmoticon: "",
            gameIsActive: false,
            gameTitle: prefs.pictures.gameTitleDefault,
            solution: [],
            showAnswerOverlay: false,
            actionButtonTitle: prefs.pictures.actionButtonDefault,
            showEndgameScreen: false,
            endgameMessage: "",
            maxStreak: 0,
            currentStreak: 0
        }
    }
    componentWillUnmount() {
        clearTimeout(timeout)
    }
    componentDidMount() {
        this.props.navigation.setParams({
            openTutorial: this.openTutorial
        })
    }
    openTutorial = () => {
        const { navigate } = this.props.navigation
        navigate("PicturesTutorial")
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: <Button
                icon={
                    <Icon name="help" size={40} color="white" />
                }
                onPress={(navigation.getParam("openTutorial"))}
                type="clear"
            />,
            headerTintColor: prefs.pictures.headerTintColor,
            headerStyle: { backgroundColor: prefs.pictures.headerColor },
            headerTitle: "Pictures"
        }
    }
    addUserEmoticon(index) {
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
    startGame = async () => {
        if (!this.state.gameIsActive) {
            // Change delays based on current streak
            const currentStreak = await getStreak(STORAGE_KEY)
            const difficulty = picturesDifficulty(currentStreak)
            pictureExistence = difficulty.existence
            pictureInterval = difficulty.interval
            console.log("New delay times:", difficulty);

            //  Randomly generate solution (currently only 5 in length)
            let solution = []
            for (let i = 0; i < 5; i++) {
                let random = Math.floor(Math.random() * 4)
                solution.push(emoticons[random])
            }

            // Log solution for debugging
            console.log("solution:", solution)

            // Set state variables to game start
            this.setState({
                gameTitle: prefs.pictures.gameTitleMemorize,
                gameIsActive: true,
                displayEmoticon: "",
                actionButtonTitle: prefs.pictures.actionButtonSubmit,
                solution: solution
            })

            // Flash series of 5 emoticons to user based on time intervals
            i = 0
            // Removes need to bind this
            let that = this
            // Wait for sequence to start
            timeout = setTimeout(function run() {
                // Set emoticon
                that.setState({
                    displayEmoticon: solution[i]
                })
                // Set display to blank
                timeout = setTimeout(() => {
                    that.setState({
                        displayEmoticon: ""
                    })
                }, pictureExistence)
                // Restart 
                timeout = setTimeout(() => {
                    i += 1
                    if (i < 5) {
                        timeout = setTimeout(run)
                    } else {
                        that.setState({
                            gameTitle: prefs.pictures.gameTitleSubmission
                        })
                    }
                }, pictureExistence + pictureInterval)
            }, sequenceDelay)
        } else {
            this.setState({
                showAnswerOverlay: true
            })
        }
    }
    submitUserInput = async () => {
        if (this.state.gameIsActive) {
            // console.log(this.state.userInput)
            // Check userInput against solution
            let userInput = this.state.userInput
            let solution = this.state.solution
            let message = winMessage
            if (userInput.length !== solution.length) {
                message = loseMessage
                await resetStreak(STORAGE_KEY)
            } else {
                for (let i = 0; i < userInput.length; i++) {
                    if (userInput[i].props.name !== solution[i]) {
                        message = loseMessage
                        await resetStreak(STORAGE_KEY)
                        break
                    }
                }
            }
            if(message === winMessage) {
                await incrementStreak(STORAGE_KEY)
            }
            const streak = await getStreak(STORAGE_KEY)
            const max = await getMaxStreak(STORAGE_KEY)
            this.setState({
                gameTitle: prefs.pictures.gameTitleDefault,
                gameIsActive: false,
                displayEmoticon: "",
                userInput: [],
                showAnswerOverlay: false,
                actionButtonTitle: prefs.pictures.actionButtonDefault,
                showEndgameScreen: true,
                endgameMessage: message,
                currentStreak: streak,
                maxStreak: max
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
            <Grid>
                <EndgameScreen 
                    isVisible={this.state.showEndgameScreen} 
                    message={this.state.endgameMessage} 
                    onBackdropPress={() => this.setState({showEndgameScreen: false})} 
                    keyId={0}
                    maxStreak={this.state.maxStreak}
                    currentStreak={this.state.currentStreak}
                />
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
                        <Row size={3} style={{ paddingTop: 10, paddingRight: 10, paddingLeft: 15, paddingBottom: 15, flexWrap: "wrap", borderColor: "gray", borderWidth: 2, margin: 10 }} >
                            {this.state.userInput}
                        </Row>
                        <Row size={1}>
                            <Col size={4}>
                                <Button
                                    title="Clear"
                                    buttonStyle={{ backgroundColor: "red" }}
                                    onPress={() => this.setState({ userInput: [] })}
                                />
                            </Col>
                            <Col size={1}></Col>
                            <Col size={4}>
                                <Button
                                    title="Submit"
                                    buttonStyle={{ backgroundColor: "green" }}
                                    onPress={this.submitUserInput}
                                />
                            </Col>
                        </Row>
                        <Row size={1} style={{ justifyContent: "center", alignItems: "flex-end" }}>
                            <Text h4>Press the emoticons!</Text>
                        </Row>
                        <Row size={2}>
                            <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    color="black"
                                    name="emoticon-happy-outline"
                                    size={70}
                                    onPress={() => this.addUserEmoticon(0)}
                                    style={{ backgroundColor: "#fffaa3", borderRadius: 40 }}
                                />
                            </Col>
                            <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    color="black"
                                    name="emoticon-neutral-outline"
                                    size={70}
                                    onPress={() => this.addUserEmoticon(1)}
                                    style={{ backgroundColor: "#fffaa3", borderRadius: 40 }}
                                />
                            </Col>
                            <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    color="black"
                                    name="emoticon-sad-outline"
                                    size={70}
                                    onPress={() => this.addUserEmoticon(2)}
                                    style={{ backgroundColor: "#fffaa3", borderRadius: 40 }}
                                />
                            </Col>
                            <Col size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    color="black"
                                    name="emoticon-wink-outline"
                                    size={70}
                                    onPress={() => this.addUserEmoticon(3)}
                                    style={{ backgroundColor: "#fffaa3", borderRadius: 40 }}
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
                    <Col size={5} style={{ borderColor: "black", borderWidth: 3, backgroundColor: "lightblue", justifyContent: "center", alignItems: "center" }}>
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
                        <Button title={this.state.actionButtonTitle} onPress={this.startGame} />
                    </Col>
                    <Col size={1}></Col>
                </Row>
            </Grid>
        )
    }
}