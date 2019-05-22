import React from "react";
import { View, StyleSheet } from "react-native";

export function Square() {
    return <View style={{ backgroundColor: "red", width: 100, height: 100 }}></View>
}

export function Circle() {
    return <View style={{ backgroundColor: "red", width: 100, height: 100, borderRadius: 50 }}></View>
}

export function Triangle() {
    return <View style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 100,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red'
    }}></View>
}

export function Plus() {
    return (
        <View>
            <View style={styles.crossUp} />
            <View style={styles.crossFlat} />
        </View>
    )
}

export function Pentagon() {
    return (
        <View style={{position: "absolute", top: 35}}>
            <View style={styles.pentagon}>
                <View style={styles.pentagonInner} />
                <View style={styles.pentagonBefore} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    crossUp: {
        backgroundColor: 'red',
        height: 100,
        width: 20
    },
    crossFlat: {
        backgroundColor: 'red',
        height: 20,
        width: 100,
        position: 'absolute',
        left: -40,
        top: 40
    },
    pentagon: {
        backgroundColor: 'transparent'
    },
    pentagonInner: {
        width: 90,
        borderBottomColor: 'red',
        borderBottomWidth: 0,
        borderLeftColor: 'transparent',
        borderLeftWidth: 18,
        borderRightColor: 'transparent',
        borderRightWidth: 18,
        borderTopColor: 'red',
        borderTopWidth: 50
    },
    pentagonBefore: {
        position: 'absolute',
        height: 0,
        width: 0,
        top: -35,
        left: 0,
        borderStyle: 'solid',
        borderBottomColor: 'red',
        borderBottomWidth: 35,
        borderLeftColor: 'transparent',
        borderLeftWidth: 45,
        borderRightColor: 'transparent',
        borderRightWidth: 45,
        borderTopWidth: 0,
        borderTopColor: 'transparent',
    }
})