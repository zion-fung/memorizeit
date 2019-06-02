// Used for making game more difficult over time
const prefs = require("../../storage/prefs").prefs

/**
    Returns the new difficulty value based on parameters (most notably user streak)

    Formula: value = start - floor(streak / interval) * step
    @param start maxmimum timeLimit or starting timeLimit
    @param stop minimum timeLimit or ending timeLimit
    @param interval every interval, the difficulty changes
    @param step amount of change per interval
    @param streak value of user streak
*/
function difficultyValue(start, stop, interval, step, streak) {
    const value = start - Math.floor(streak / interval) * step
    if(value < stop) {
        return stop
    }
    return value
}

/* 
    Given a streak, reduce the time limit
*/
function gridDifficulty(streak) {
    const difficulty = difficultyValue(prefs.grid.timeLimit, prefs.grid.minTimeLimit, prefs.grid.difficultyInterval, prefs.grid.difficultyStep, streak)
    return difficulty
}

// Reduce pictureExistence and pictureInterval based on streak
function picturesDifficulty(streak) {
    const existence = difficultyValue(prefs.pictures.pictureExistence, prefs.pictures.difficulty.minExistence, prefs.pictures.difficulty.changeInterval, prefs.pictures.difficulty.existenceStep,
        streak)
    const interval = difficultyValue(prefs.pictures.pictureInterval, prefs.pictures.difficulty.minInterval, prefs.pictures.difficulty.changeInterval, prefs.pictures.difficulty.intervalStep,
        streak)
    return { existence: existence, interval: interval }
}

function quotesDifficulty(streak) {
    const difficulty = difficultyValue(prefs.quotes.timeLimit, prefs.quotes.difficulty.minTimeLimit, prefs.quotes.difficulty.interval, prefs.quotes.difficulty.step, streak)
    return difficulty
}

module.exports = {
    gridDifficulty,
    picturesDifficulty,
    quotesDifficulty
}