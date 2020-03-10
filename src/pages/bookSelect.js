import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Navigation, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default class bookSelect extends Component {

    state = {
        books: '',
    }

    componentDidMount() {
        this.requestBookApi()
    }

    requestBookApi = async () => {
        let abrev = []
        try {
            let obj = {}
            const response = await api.get('/books')
            for (let i = 0; i < response.data.length; i++) {
                obj.abbrev = response.data[i].abbrev.pt
                obj.name = response.data[i].name
                abrev.push(obj)
                obj = {}
            }
            console.log(abrev)
            this.setState({ books: abrev })
        } catch (error) {
            console.log(error)
        }
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.textBox}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("versesText", { abbrev: item.abbrev }) }}>
                    <Text style={styles.name}>   {item.name}</Text>
                </TouchableOpacity>
            </View>
        )

        this.setState({ books: this.state.books })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>


                </View>

                <View style={styles.flatlistView}>
                <FlatList
                    style={styles.flatlist}
                    //contentContainerStyle={{ paddingBottom: 85 }}
                    data={this.state.books}
                    keyExtractor={item => item.name}
                    renderItem={this.renderItem}
                />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: 'red'
    },

    name: {
        fontSize: 20,
        textAlign: 'auto',
        fontFamily: 'sans-serif',
        color: '#393939',
    },

    textBox: {
        alignSelf: 'auto',
        textAlign: 'justify',
        paddingBottom: 15,
        paddingTop: 15,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
        borderColor: '#E5E5E5',
        backgroundColor: '#F6F6F6'
    },

    flatlist: {
        flexGrow: 1,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 80,
        backgroundColor: '#F3F3F3'
    },

    header: {
        // flexGrow: 1,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: 'black'
    },

    flatlistView: {
        flexGrow: 1,
        paddingBottom: 140,
    },
});