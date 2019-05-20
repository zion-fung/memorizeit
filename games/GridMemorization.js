import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons"

class GridMemorization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorStates: this.generateColorStates(4, 4),
            gameControlButtonTitle: "Start",
            gameIsActive: false,
            gameControlButtonStatus: false,
            gameTitle: "Press Start!"
        }
    }
    static navigationOptions = {
        header: null
    }
    generateGrid(rowCount, colCount) {
        let rows = []
        for(let r = 0;r < rowCount;r++) {
            let cols = []
            for(let c = 0;c < colCount;c++) {
                cols.push(
                    <Col key={c.toString()} size={1} style={{backgroundColor: this.state.colorStates[r][c], margin: 6}} onPress={() => {
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
        for(let r = 0;r < rowCount;r++) {
            let row = []
            for(let c = 0;c < colCount;c++) {
                row.push("blue")
            }
            states.push(row)
        }
        return states
    }
    generateRandomColorStates(rowCount, colCount) {
        let states = []
        for(let r = 0;r < rowCount;r++) {
            let row = []
            for(let c = 0;c < colCount;c++) {
                let random = Math.floor(Math.random() * 2)
                random === 0 ? row.push("red") : row.push("blue")
            }
            states.push(row)
        }
        return states
    }
    flipColor(row, col) {
        if(!this.state.gameIsActive) {
            return
        }
        let colorStates = this.state.colorStates
        let color = colorStates[row][col] === "blue" ? "red" : "blue"
        colorStates[row][col] = color
        this.setState({
            colorStates: colorStates
        })
    }
    initiateGameControl() {
        if(!this.state.gameIsActive) {
            // Game is not running
            // Set titles and buttons
            this.setState({
                gameControlButtonTitle: "Stop",
                gameIsActive: true,
                gameTitle: "Memorize the pattern!"
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
            setTimeout(() => {
                this.setState({
                    colorStates: this.generateColorStates(4, 4),
                    // Tell user to enter pattern
                    gameTitle: "Enter the pattern!"
                })
            }, 5000)
        } else {
            // Game is running
            this.setState({
                gameControlButtonTitle: "Start",
                gameIsActive: false
            })
            // Check user entered pattern against generated pattern
            let userStates = this.state.colorStates
            let correctStates = this.state.correctColorStates
            // Tell user if they're correct or not
            for(let r = 0;r < 4;r++) {
                for(let c = 0;c < 4;c++) {
                    if(userStates[r][c] !== correctStates[r][c]) {
                        alert("You got it wrong...\nMaybe next time!")
                        this.setState({
                            colorStates: this.generateColorStates(4, 4),
                            gameTitle: "Press Start!"
                        })
                        return
                    }
                }
            }
            alert("You got it correct!")
            this.setState({
                colorStates: this.generateColorStates(4, 4),
                gameTitle: "Press Start!"
            })
        }
    }
    render() {
        const { navigate } = this.props.navigation
        const grid = this.generateGrid(4, 4)
        return(
            <Grid>
                <Row size={1}>
                    <Col size={1} style={{margin: 15}}>
                        <Icon
                            name="md-home"
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
                            name="md-help"
                            raised
                            color="#ea4c33"
                        />
                    </Col>
                </Row>
                <Row size={2}>
                    <Col size={1}></Col>
                    <Col size={5} style={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>{this.state.gameTitle}</Text>
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
                                onPress={() => this.initiateGameControl()}
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
    red: {
        backgroundColor: "red",
        margin: 1
    },
    blue: {
        backgroundColor: "blue",
        margin: 1
    },
    grid: {
        backgroundColor: "gray",
        padding: 3
    },
    col: {
        backgroundColor: "blue",
        margin: 6
    }
})

export default GridMemorization;