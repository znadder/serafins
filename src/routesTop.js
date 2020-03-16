import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import bookSelect from './pages/bookSelect';
import chapterSelect from './pages/chapterSelect';

const AppNavigator = createMaterialTopTabNavigator(
    {
        Books: {
            screen: bookSelect,
            navigationOptions: {
                title: "LIVROS",
                },
        },

        Chapters: {
            screen: chapterSelect,
            navigationOptions: {
                title: "CAPÍTULOS",
            },
        }
    },
    {
        swipeEnabled: true,
        lazy: true,
        tabBarPosition: "top",
        tabBarOptions: {
            activeTintColor: '#252525',
            inactiveTintColor: "#8B8B8B",
            upperCaseLabel: true,
            style: {
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                    width: -20,
                    height: -20,
                },
                shadowOpacity: 0.40,
                shadowRadius: 4.65,
                elevation: 5,
                borderBottomWidth: 2,
                borderBottomColor: "#D0D0D0",
            },
            tabStyle: {
            },
            labelStyle: {
                margin: 0,
                fontSize: 16,
            },
            indicatorStyle: {
                borderBottomColor: "#3F8EDE",
                bottom: -1,
                borderBottomWidth: 3,
            },
        }
    },
)

export default createAppContainer(AppNavigator);
