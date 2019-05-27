import React, { Component } from "react"
import { Grid, Row, Col } from "react-native-easy-grid"
import { Text } from "react-native-elements"
import { getMaxStreak, getStreak } from "./storage/storage"

export default class Scores extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maxStreaks: [-1, -1, -1],
            currentStreaks: [-1, -1, -1]
        }
    }
    async componentDidMount() {
        const maxGrid = await getMaxStreak(0)
        const maxPictures = await getMaxStreak(1)
        const maxQuotes = await getMaxStreak(2)
        const maxStreaks = [maxGrid, maxPictures, maxQuotes]
        console.log("maxStreaks:", maxStreaks)
        const grid = await getStreak(0)
        const pictures = await getStreak(1)
        const quotes = await getStreak(2)
        const scores = [grid, pictures, quotes]
        console.log("scores:", scores);
        this.setState({maxStreaks: maxStreaks, currentStreaks: scores})
    }
    render() {
        return(
            <Grid>
                <Row size={1}></Row>
                <Row size={2}>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <Text>Grid longest streak: {this.state.maxStreaks[0]}</Text>
                        <Text>Grid current streak: {this.state.currentStreaks[0]}</Text>
                        <Text>Pictures longest streak: {this.state.maxStreaks[1]}</Text>
                        <Text>Pictures current streak: {this.state.currentStreaks[1]}</Text>
                        <Text>Quotes longest streak: {this.state.maxStreaks[2]}</Text>
                        <Text>Quotes current streak: {this.state.currentStreaks[2]}</Text>
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={1}></Row>
            </Grid>
        )
    }
}