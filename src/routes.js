import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';
import versesText from './pages/versesText'


export default createAppContainer(createStackNavigator({
    Main,
    versesText,
}, {
    headerMode: 'null',
}));