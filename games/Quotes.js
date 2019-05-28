import React, { Component } from "react";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Text, Button, Overlay, Input, Header } from "react-native-elements";
import quotes from "./assets/quotes.json"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { ScrollView, View, Alert, Animated } from "react-native"
import EndgameScreen from "./EndgameScreen"
import { incrementStreak, resetStreak, getStreak, getMaxStreak } from "../storage/storage"
const prefs = require("../storage/prefs").prefs
const winMessage = prefs.quotes.winMessage
const loseMessage = prefs.quotes.loseMessage
const STORAGE_KEY = prefs.quotes.STORAGE_KEY

export default class Quotes extends Component {
    constructor(props) {
        super(props)
        const animatedValue = new Animated.Value(0.99)
        this.state = {
            gameTitle: prefs.quotes.gameTitleDefault,
            actionButtonTitle: prefs.quotes.actionButtonDefault,
            showAnswerOverlay: false,
            gameIsActive: false,
            userText: "",
            userAuthor: "",
            tempAuthor: "",
            quoteLength: quotes.length,
            showEndgameScreen: false,
            endgameMessage: "",
            maxStreak: 0,
            currentStreak: 0,
            tryNumber: 1,
            fadeAnim: animatedValue
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            openTutorial: this.openTutorial
        })
    }
    openTutorial = () => {
        const { navigate } = this.props.navigation
        navigate("QuotesTutorial")
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
            headerTintColor: prefs.quotes.headerTintColor,
            headerStyle: { backgroundColor: prefs.quotes.headerColor },
            headerTitle: "Quotes"
        }
    }
    checkAnswers = async () => {
        this.setState({
            tryNumber: this.state.tryNumber + 1
        })
        let correctText = this.state.quoteText.toLocaleLowerCase()
        let correctAuthor = this.state.tempAuthor.toLocaleLowerCase()
        let userText = this.state.userText.toLocaleLowerCase()
        let userAuthor = this.state.userAuthor.toLocaleLowerCase()
        let message = winMessage
        if (correctText !== userText || correctAuthor !== userAuthor) {
            message = loseMessage
            if(this.state.tryNumber < 3) {
                Alert.alert("", `You were wrong... Try again!\nTries left: ${3 - this.state.tryNumber}`)
                return
            }
            await resetStreak(STORAGE_KEY)
        }
        if(message === winMessage) {
            await incrementStreak(STORAGE_KEY)
        }
        const streak = await getStreak(STORAGE_KEY)
        const max = await getMaxStreak(STORAGE_KEY)
        this.setState({
            showAnswerOverlay: false,
            gameIsActive: false,
            userText: "",
            userAuthor: "",
            gameTitle: prefs.quotes.gameTitleDefault,
            actionButtonTitle: prefs.quotes.actionButtonDefault,
            quoteText: "",
            quoteAuthor: "",
            showEndgameScreen: true,
            endgameMessage: message,
            currentStreak: streak,
            maxStreak: max
        })
        
    }
    actionButton() {
        if (!this.state.gameIsActive) {
            let random = Math.floor(Math.random() * this.state.quoteLength)
            let words = quotes[random].quoteText.split(" ").length
            let authorWords = quotes[random].quoteAuthor.split(" ").length
            while (words > 10 || quotes[random].quoteAuthor === "" || authorWords > 2) {
                random = Math.floor(Math.random() * this.state.quoteLength)
                words = quotes[random].quoteText.split(" ").length
                authorWords = quotes[random].quoteAuthor.split(" ").length
            }
            this.setState({
                actionButtonTitle: prefs.quotes.actionButtonSubmit,
                gameTitle: prefs.quotes.gameTitleMemorize,
                gameIsActive: true,
                quoteText: quotes[random].quoteText,
                quoteAuthor: quotes[random].quoteAuthor,
                tempAuthor: quotes[random].quoteAuthor,
                tryNumber: 1
            })
            console.log("quote:", quotes[random]);
            let time = Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 0,
                    duration: prefs.quotes.timeLimit,
                    useNativeDriver: true
                }
            ).start()
            console.log("time:", time);
        } else {
            this.setState({
                showAnswerOverlay: true,
                quoteAuthor: ""
            })
        }
    }
    clearOverlay = () => {
        let author = this.state.tempAuthor
        this.setState({
            showAnswerOverlay: false,
            userText: "",
            userAuthor: "",
            quoteAuthor: author
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
                <Overlay isVisible={this.state.showAnswerOverlay} onBackdropPress={this.clearOverlay} height="90%" width="90%" windowBackgroundColor="rgba(0, 0, 0, 0.8)"
                >
                    <ScrollView>
                        <Header
                            leftComponent={
                                <Icon
                                    name="arrow-left"
                                    color="white"
                                    size={30}
                                    onPress={this.clearOverlay}
                                />
                            }
                            centerComponent={
                                <Text h4 style={{ color: "white" }}>Quote Memory</Text>
                            }
                        />
                        <View style={{ height: 25 }}></View>
                        <Input
                            style={{ marginTop: 15, marginBottom: 15 }}
                            value={this.state.userText}
                            placeholder="Quote text..."
                            onChangeText={(text) => this.setState({ userText: text })}
                        ></Input>
                        <View style={{ height: 25 }}></View>
                        <Input
                            value={this.state.userAuthor}
                            placeholder="Quote author..."
                            onChangeText={(text) => this.setState({ userAuthor: text })}
                        ></Input>
                        <View style={{ height: 25 }}></View>
                        <Button
                            style={{ marginTop: 15, marginBottom: 15 }}
                            title="Check"
                            onPress={this.checkAnswers}
                        ></Button>
                    </ScrollView>
                </Overlay>
                <Row size={1} style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text h4>{this.state.gameTitle}</Text>
                </Row>
                <Row size={5}>
                    <Col size={1}></Col>
                    <Col size={10} style={{ backgroundColor: "lightblue", borderColor: "black", borderWidth: 3 }}>
                        <Row size={8}>
                            <Animated.View style={{ opacity: this.state.fadeAnim, margin: 15 }}>
                                <Text h3>{this.state.quoteText}</Text>
                            </Animated.View>
                        </Row>
                        <Row size={1} style={{ paddingBottom: 10 }}>
                            <Animated.View style={{ opacity: this.state.fadeAnim, position: "absolute", right: 0, marginRight: 10, marginBottom: 10}}>
                                <Text h3>- {this.state.quoteAuthor}</Text>
                            </Animated.View>
                        </Row>
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text h4>tries left: {4 - this.state.tryNumber}</Text>
                </Row>
                <Row size={1}>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <Button
                            title={this.state.actionButtonTitle}
                            onPress={() => this.actionButton()}
                        />
                    </Col>
                    <Col size={1}></Col>
                </Row>
            </Grid>
        )
    }
}