/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';
import GridMemorization from "./games/GridMemorization";
import Binary from "./games/Binary";
import Home from "./Home";
import Pictures from "./games/Pictures";
import Quotes from "./games/Quotes";
import GameSelection from "./games/GameSelection";
import GridTutorial from "./games/tutorials/GridTutorial";
import PicturesTutorial from "./games/tutorials/PicturesTutorial"
import QuotesTutorial from "./games/tutorials/QuotesTutorial"
import Scores from "./Scores"
import Tutorials from "./games/Tutorials"

const MainNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    GridMemorization: {
        screen: GridMemorization
    },
    Binary: {
        screen: Binary
    },
    Pictures: {
        screen: Pictures
    },
    Quotes: {
        screen: Quotes
    },
    GameSelection: {
        screen: GameSelection
    },
    GridTutorial: {
        screen: GridTutorial
    },
    PicturesTutorial: {
        screen: PicturesTutorial
    },
    QuotesTutorial: {
        screen: QuotesTutorial
    },
    Scores: {
        screen: Scores
    },
    Tutorials: {
        screen: Tutorials
    }
}, {
    initialRouteName: "Home",
    headerLayoutPreset: "center"
});

const App = createAppContainer(MainNavigator);

export default App;