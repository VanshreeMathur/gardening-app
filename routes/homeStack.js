import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import UserPost from '../screens/UserPost';
import Stats from '../screens/Stats';

const screens = {

    // top screen is default
    HomeScreen: {
        screen: Home
    },
    UserPostScreen: {
        screen: UserPost
    },
    StatsScreen: {
        screen: Stats
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);