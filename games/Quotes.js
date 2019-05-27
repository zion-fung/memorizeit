import React, { Component } from "react";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Text, Button, Overlay, Input, Header } from "react-native-elements";
import quotes from "./assets/quotes.json"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { ScrollView, View } from "react-native"

export default class Quotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameTitle: "Press start!",
            actionButtonTitle: "Start!",
            showAnswerOverlay: false,
            gameIsActive: false,
            userText: "",
            userAuthor: "",
            tempAuthor: "",
            quoteLength: quotes.length
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
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#2089dc" },
            headerTitle: "Quotes"
        }
    }
    checkAnswers() {
        let correctText = this.state.quoteText.toLocaleLowerCase()
        let correctAuthor = this.state.tempAuthor.toLocaleLowerCase()
        let userText = this.state.userText.toLocaleLowerCase()
        let userAuthor = this.state.userAuthor.toLocaleLowerCase()
        if (correctText === userText && correctAuthor === userAuthor) {
            alert("You were correct!")
            this.setState({
                showAnswerOverlay: false,
                gameIsActive: false,
                userText: "",
                userAuthor: "",
                gameTitle: "Press start!",
                actionButtonTitle: "Start!",
                quoteText: "",
                quoteAuthor: ""
            })
            return
        }
        alert("You were wrong...\nTry again!")
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
                actionButtonTitle: "Check",
                gameTitle: "Memorize as fast as you can!",
                gameIsActive: true,
                quoteText: quotes[random].quoteText,
                quoteAuthor: quotes[random].quoteAuthor,
                tempAuthor: quotes[random].quoteAuthor
            })
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
                <Overlay isVisible={this.state.showAnswerOverlay} onBackdropPress={this.clearOverlay} height="90%" width="90%" windowBackgroundColor="rgba(0, 0, 0, 0.8)"
                >
                    <ScrollView>
                        <Header
                            leftComponent={
                                <Icon
                                    name="arrow-left"
                                    color="black"
                                    size={30}
                                    onPress={this.clearOverlay}
                                />
                            }
                            centerComponent={
                                <Text h4 style={{ color: "black" }}>Quote Memory</Text>
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
                            onPress={() => this.checkAnswers()}
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
                            <Text h3 style={{ margin: 15 }}>{this.state.quoteText}</Text>
                        </Row>
                        <Row size={1} style={{ paddingBottom: 10 }}>
                            <Text h3 style={{ position: "absolute", right: 0, marginRight: 10, marginBottom: 10 }}>- {this.state.quoteAuthor}</Text>
                        </Row>
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={1}></Row>
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