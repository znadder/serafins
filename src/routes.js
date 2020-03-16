import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';
import versesText from './pages/versesText';
import bookSelect from './pages/bookSelect';
import chapterSelect from './pages/chapterSelect';
import navigationTop from './pages/navigationTop';
import routeTop from './routesTop';


export default createAppContainer(createStackNavigator({
    navigationTop,
    versesText,   
}, {
    headerMode: 'null',
}));