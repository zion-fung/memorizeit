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
import Shapes from "./games/Shapes";
import Quotes from "./games/Quotes";
import GameSelection from "./games/GameSelection";

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
    Shapes: {
        screen: Shapes
    },
    Quotes: {
        screen: Quotes
    },
    GameSelection: {
        screen: GameSelection
    }
}, {
    initialRouteName: "Home"
});

const App = createAppContainer(MainNavigator);

export default App;