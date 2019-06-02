export const prefs = {
    grid: {
        winMessage: "You were right!",
        loseMessage: "You were wrong...",
        actionButtonDefault: "Start",
        actionButtonSubmit: "Check",
        gameTitleDefault: "Press Start!",
        gameTitleMemorize: "Memorize the pattern!",
        gameTitleSubmission: "Enter the pattern!",
        headerColor: "#2089dc",
        headerTintColor: "white",
        squareDefaultColor: "#2089dc",
        squareFlipColor: "red",
        STORAGE_KEY: 0,
        timeLimit: 5000, // Starting time limit
        minTimeLimit: 800, // Smallest time limit possible
        difficultyInterval: 2, // Every x correct games, the difficulty goes up
        difficultyStep: 300 // Time reduces by x every interval
    },
    pictures: {
        winMessage: "You were right!",
        loseMessage: "You were wrong...",
        actionButtonDefault: "Start",
        actionButtonSubmit: "Check",
        gameTitleDefault: "Press Start!",
        gameTitleMemorize: "Memorize the sequence!",
        gameTitleSubmission: "Enter the sequence!",
        headerColor: "#2089dc",
        headerTintColor: "white",
        squareDefaultColor: "",
        squareFlipColor: "",
        STORAGE_KEY: 1,
        sequenceDelay: 1000, // ms before sequence begins
        pictureExistence: 450, // ms that the picture stays up
        pictureInterval: 150, // ms between picture dissapearence and appearence
        difficulty: {
            changeInterval: 2, // Every x correct games, the difficulty goes up
            existenceStep: 15, // pictureExistence decreases by x every interval
            intervalStep: 5, // pictureInterval decreases by x every interval
            minExistence: 225, // lowest value for pictureExistence
            minInterval: 75 // lowest value for pictureInterval
        }
    },
    quotes: {
        winMessage: "You were right!",
        loseMessage: "You were wrong...",
        actionButtonDefault: "Start",
        actionButtonSubmit: "Check",
        gameTitleDefault: "Press Start!",
        gameTitleMemorize: "Memorize it before it fades!",
        gameTitleSubmission: "",
        headerColor: "#2089dc",
        headerTintColor: "white",
        squareDefaultColor: "",
        squareFlipColor: "",
        timeLimit: 120000, // time in ms before quote fades
        STORAGE_KEY: 1,
        difficulty: {
            minTimeLimit: 45000, // min time in ms user can have
            interval: 2, // every x correct games, the time shortens
            step: 80000 // how many ms timeLimit decreases every interval
        }
    },
}