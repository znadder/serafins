import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './../routesTop';

const AppIndex = createAppContainer(AppNavigator)

export default class navigationTop extends Component {

    componentWillReceiveProps(nextProps){
        console.log(nextProps, 'componentWill')
    }
    render() {

        console.log(this.props.navigation, ' navigation tops')
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text></Text>

                </View>
                <View style={styles.navTab}>
                    <StatusBar
                        backgroundColor='#D5D5D5'
                        barStyle='light-content'
                    />
                    <AppIndex
                        screenProps={{ rootNavigation: this.props.navigation }}
                    />
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: -20,
            height: -20,
        },
        shadowOpacity: 0.40,
        shadowRadius: 4.65,
        elevation: 5,
    },

    navTab: {
        flex: 18,
    }
});  

