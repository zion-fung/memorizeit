/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';
import GridMemorization from "./games/GridMemorization";
import Home from "./Home";

const MainNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    GridMemorization: {
        screen: GridMemorization
    }
}, {
    initialRouteName: "Home"
});

const App = createAppContainer(MainNavigator);

export default App;