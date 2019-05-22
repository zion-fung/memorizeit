import React, { Component } from "react";
import { Grid, Row, Col } from "react-native-easy-grid"
import { Button, Text } from "react-native-elements";

export default class GameSelection extends Component {
    render() {
        const { navigate } = this.props.navigation
        return (
            <Grid>
                <Row size={4} style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text h2>Games</Text>
                </Row>
                <Row size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                    <Col size={1}></Col>
                    <Col size={4}>
                        <Button
                            title="Grid"
                            raised
                            onPress={() => navigate("GridMemorization")}
                        />
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                    <Col size={1}></Col>
                    <Col size={4}>
                        <Button
                            title="Pictures"
                            raised
                            onPress={() => navigate("Shapes")}
                        />
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={1} style={{ justifyContent: "center", alignItems: "center" }}>
                    <Col size={1}></Col>
                    <Col size={4}>
                        <Button
                            title="Quotes"
                            raised
                            onPress={() => navigate("Quotes")}
                        />
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row size={1}></Row>
            </Grid>
        )
    }
}