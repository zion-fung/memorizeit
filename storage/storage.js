import AsyncStorage from '@react-native-community/async-storage';

const KEYS = ["Grid", "Pictures", "Quotes"]
const MAX_KEYS = ["GridMax", "PicturesMax", "QuotesMax"]

setStreak = async (id, streak) => {
    try {
        await AsyncStorage.setItem(KEYS[id], streak)
    } catch(error) {
        console.log("storage.js: setStreak error:", error)
    }
}

getStreak = async (id) => {
    try {
        let streak = await AsyncStorage.getItem(KEYS[id])
        if(!streak) {
            streak = 0
        }
        return streak
    } catch (error) {
        console.log("storage.js: getStreak error:", error)
        return null
    }
}

incrementStreak = async (id) => {
    try {
        let streak = await AsyncStorage.getItem(KEYS[id])
        if(!streak) {
            streak = 0
        }
        streak = Number(streak) + 1
        let maxStreak = await AsyncStorage.getItem(MAX_KEYS[id])
        maxStreak = Number(maxStreak)
        if(maxStreak < streak) {
            await AsyncStorage.setItem(MAX_KEYS[id], String(streak))
        }
        await AsyncStorage.setItem(KEYS[id], String(streak))
    } catch (error) {
        console.log("storage.js: incrementStreak error:", error)
    }
}

resetStreak = async (id) => {
    try {
        await AsyncStorage.setItem(KEYS[id], "0")
    } catch (error) {
        console.log("storage.js: resetStreak error:", error)
    }
}

getMaxStreak = async (id) => {
    try {
        let max = await AsyncStorage.getItem(MAX_KEYS[id])
        max = Number(max)
        return max
    } catch (error) {
        console.log("storage.js: getMaxStreak error:", error)
        return 0
    }
}

module.exports = {
    setStreak, 
    getStreak, 
    incrementStreak,
    resetStreak,
    getMaxStreak
}