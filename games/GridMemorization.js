import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { incrementStreak, resetStreak, getStreak, getMaxStreak } from "../storage/storage"
import EndgameScreen from "./EndgameScreen"
const prefs = require("../storage/prefs").prefs
import { gridDifficulty } from "./difficulty/difficulty"

let timeout = null
const squareDefaultColor = prefs.grid.squareDefaultColor;
const squareFlipColor = prefs.grid.squareFlipColor;
const winMessage = prefs.grid.winMessage
const loseMessage = prefs.grid.loseMessage
const STORAGE_KEY = prefs.grid.STORAGE_KEY
let timeLimit = prefs.grid.timeLimit

class GridMemorization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorStates: this.generateColorStates(4, 4),
            gameControlButtonTitle: prefs.grid.actionButtonDefault,
            gameIsActive: false,
            gameControlButtonStatus: false,
            gameTitle: prefs.grid.gameTitleDefault,
            showTutorial: false,
            canControlGame: true,
            showEndgameScreen: false,
            endgameMessage: "",
            maxStreak: 0,
            currentStreak: 0
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            openTutorial: this.openTutorial
        })
    }
    componentWillUnmount() {
        clearTimeout(timeout)
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight:
                <Button
                    icon={
                        <Icon name="help" size={40} color="white" />
                    }
                    onPress={(navigation.getParam("openTutorial"))}
                    type="clear"
                />,
            headerTintColor: "white",
            headerStyle: { backgroundColor: squareDefaultColor },
            headerTitle: "Grid"
        }
    }
    generateGrid(rowCount, colCount) {
        let rows = []
        for (let r = 0; r < rowCount; r++) {
            let cols = []
            for (let c = 0; c < colCount; c++) {
                cols.push(
                    <Col key={c.toString()} size={1} style={{ backgroundColor: this.state.colorStates[r][c], margin: 6 }} onPress={() => {
                        this.flipColor(r, c)
                    }}>
                    </Col>
                )
            }
            rows.push(
                <Row key={r.toString()} size={1}>
                    {cols}
                </Row>
            )
        }
        return <Grid style={styles.grid}>{rows}</Grid>
    }
    generateColorStates(rowCount, colCount) {
        let states = []
        for (let r = 0; r < rowCount; r++) {
            let row = []
            for (let c = 0; c < colCount; c++) {
                row.push(squareDefaultColor)
            }
            states.push(row)
        }
        return states
    }
    generateRandomColorStates(rowCount, colCount) {
        let states = []
        for (let r = 0; r < rowCount; r++) {
            let row = []
            for (let c = 0; c < colCount; c++) {
                let random = Math.floor(Math.random() * 2)
                random === 0 ? row.push(squareFlipColor) : row.push(squareDefaultColor)
            }
            states.push(row)
        }
        return states
    }
    flipColor(row, col) {
        if (!this.state.canControlGame) {
            return
        }
        let colorStates = this.state.colorStates
        let color = colorStates[row][col] === squareDefaultColor ? squareFlipColor : squareDefaultColor
        colorStates[row][col] = color
        this.setState({
            colorStates: colorStates
        })
    }
    initiateGameControl = async () => {
        if(!this.state.canControlGame) {
            return
        }
        if (!this.state.gameIsActive) {
            const currentStreak = await getStreak(STORAGE_KEY)
            timeLimit = gridDifficulty(currentStreak)
            // Game is not running
            // Set titles and buttons
            this.setState({
                gameControlButtonTitle: prefs.grid.actionButtonSubmit,
                gameIsActive: true,
                gameTitle: prefs.grid.gameTitleMemorize,
                canControlGame: false
            })
            // Generate random pattern
            // Set colorStates to random patterns
            let pattern = this.generateRandomColorStates(4, 4)
            this.setState({
                colorStates: pattern,
                correctColorStates: pattern
            })
            // Wait a certain amount of time
            // Switch to default colorStates
            timeout = setTimeout(() => {
                this.setState({
                    colorStates: this.generateColorStates(4, 4),
                    // Tell user to enter pattern
                    gameTitle: prefs.grid.gameTitleSubmission,
                    canControlGame: true
                })
            }, timeLimit)
            console.log("timeLimit:", timeLimit);
        } else {
            // Game is running
            this.setState({
                gameControlButtonTitle: prefs.grid.actionButtonDefault,
                gameIsActive: false
            })
            // Check user entered pattern against generated pattern
            let userStates = this.state.colorStates
            let correctStates = this.state.correctColorStates
            let message = ""
            // Tell user if they're correct or not
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    if (userStates[r][c] !== correctStates[r][c]) {
                        // alert("You got it wrong...\nMaybe next time!")
                        await resetStreak(STORAGE_KEY)
                        const max = await getMaxStreak(STORAGE_KEY)
                        this.setState({
                            colorStates: this.generateColorStates(4, 4),
                            gameTitle: "Press Start!",
                            showEndgameScreen: true,
                            endgameMessage: loseMessage,
                            currentStreak: 0,
                            maxStreak: max
                        })
                        return
                    }
                }
            }
            // alert("You got it correct!")
            await incrementStreak(STORAGE_KEY)
            const streak = await getStreak(STORAGE_KEY)
            const max = await getMaxStreak(STORAGE_KEY)
            this.setState({
                colorStates: this.generateColorStates(4, 4),
                gameTitle: prefs.grid.gameTitleDefault,
                showEndgameScreen: true,
                endgameMessage: winMessage,
                currentStreak: streak,
                maxStreak: max
            })
        }
    }
    openTutorial = () => {
        const { navigate } = this.props.navigation
        navigate("GridTutorial")
    }
    render() {
        const { navigate } = this.props.navigation
        const grid = this.generateGrid(4, 4)
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
                <Row size={2}>
                    <Col size={1}></Col>
                    <Col size={5} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{this.state.gameTitle}</Text>
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={4}>
                    <Col size={1}></Col>
                    <Col size={4}>
                        {grid}
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={1}></Row>
                <Row size={2}>
                    <Grid>
                        <Col size={1}></Col>
                        <Col size={2}>
                            <Button
                                title={this.state.gameControlButtonTitle}
                                onPress={this.initiateGameControl}
                                disabled={this.state.gameControlButtonStatus}
                            />
                        </Col>
                        <Col size={1}></Col>
                    </Grid>
                </Row>
            </Grid>
        )
    }
}

const styles = StyleSheet.create({
    grid: {
        backgroundColor: "#383838",
        padding: 3
    },
    col: {
        backgroundColor: squareDefaultColor,
        margin: 6
    }
})

export default GridMemorization;