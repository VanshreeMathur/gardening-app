import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home.js';
import UserPost from '../screens/UserPost.js';
import Stats from '../screens/Stats.js';
import SignIn from '../screens/SignIn.js'

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
    },
    SignInScreen: {
      screen: SignIn
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
