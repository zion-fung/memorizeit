import React, { memo } from "react"
import { Overlay, Text, Button } from "react-native-elements"
import { View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

function EndgameScreen({ isVisible, onBackdropPress, message, maxStreak, currentStreak }) {
    return (
        <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress} height="40%">
            <View>
                <Button
                    containerStyle={{ position: "absolute", right: -5, top: -5 }}
                    icon={
                        <Icon
                            name="close-outline"
                            size={30}
                            color="red"
                        />
                    }
                    type="clear" onPress={onBackdropPress}
                />
                <View style={{ flexDirection: "column", margin: 10, marginTop: 50 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text h3>{message}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", marginTop: 15, justifyContent: "center", alignSelf: "center" }}>
                        <View style={{ flex: 4, alignItems: "flex-end" }}>
                            <Text h4>longest streak:</Text>
                            <Text h4>current streak:</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 10 }}>
                            <Text h4>{maxStreak}</Text>
                            <Text h4>{currentStreak}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Overlay>
    )
}

export default memo(EndgameScreen);