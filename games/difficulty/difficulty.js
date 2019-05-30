// Used for making game more difficult over time
const prefs = require("../../storage/prefs").prefs

/* 
    Given a streak, reduce the time limit
    every 5 the streak goes up, reduce by 250ms
    timeLimit = maxTimeLimit - Math.floor(streak / 5) * 250
*/
function gridTimeLimit(streak) {
    const timeLimit = prefs.grid.timeLimit - Math.floor(streak / prefs.grid.difficultyInterval) * prefs.grid.difficultyStep
    if(timeLimit < prefs.grid.minTimeLimit) {
        return prefs.grid.minTimeLimit
    }
    return timeLimit
}

module.exports = {
    gridTimeLimit
}