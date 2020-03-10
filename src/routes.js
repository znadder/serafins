import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';
import versesText from './pages/versesText';
import bookSelect from './pages/bookSelect';


export default createAppContainer(createStackNavigator({
    Main,
    versesText,
    bookSelect,
}, {
    headerMode: 'null',
}));