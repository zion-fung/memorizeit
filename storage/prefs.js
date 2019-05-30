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
        minTimeLimit: 1000, // Smallest time limit possible
        difficultyInterval: 5, // Every x correct games, the difficulty goes up
        difficultyStep: 250 // Time reduces by x every interval
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
        STORAGE_KEY: 1
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
        timeLimit: 300000,
        STORAGE_KEY: 2
    },
}