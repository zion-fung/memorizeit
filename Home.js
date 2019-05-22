import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { Grid, Row, Col } from "react-native-easy-grid";

export default class Home extends Component {
    render() {
        const { navigate } = this.props.navigation
        return(
            <Grid>
                <Row size={1} style={{alignItems: "center", justifyContent: "center"}}>
                    <Button title="Grid" onPress={() => navigate("GridMemorization")} />
                </Row>
                <Row size={1} style={{alignItems: "center", justifyContent: "center"}}>
                    <Button title="Shapes" onPress={() => navigate("Shapes")} />
                </Row>
                <Row size={1} style={{alignItems: "center", justifyContent: "center"}}>
                    <Button title="Quotes" onPress={() => navigate("Quotes")} />
                </Row>
            </Grid>
        )
    }
}