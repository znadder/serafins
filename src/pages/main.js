import React, { Component } from 'react';
import api from '../services/api';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "Referência"
    }


    state = {
        books: '',
        abbrev: 'gn',
        chapter: 1,
    }

    componentDidMount() {
        this.requestBookApi();
    }

    requestBookApi = async () => {
        let abrev = []
        try {
            let obj = {}
            const response = await api.get('/books')
            for (let i = 0; i < response.data.length; i++) {
                obj.abbrev = response.data[i].abbrev.pt
                obj.chapter = response.data[i].chapters
                abrev.push(obj)
                obj = {}
            }
            this.setState({ books: abrev })
        } catch (error) {
            console.log(error)
        }
    }

    getAbbrev = (text) => {
        this.setState({ abbrev: text });
    }

    getChapter = (text) => {
        this.setState({ chapter: text });
    }

    findBook = async () => {
        const response = await api.get(`/books/${this.state.abbrev}`)
        const chapterLimit = response.data.chapters
        this.props.navigation.navigate("bookSelect", { abrrev: this.state.abbrev, chapter: this.state.chapter, chapterLimit: chapterLimit, books: this.state.books })
    }

    renderItem = ({ item }) => {
        return (<Text>{item.verseNumber}: {item.verse} </Text>)
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Insira um livro..."
                    placeholderTextColor="#3399ff"
                    autoCapitalize="none"
                    onChangeText={this.getAbbrev}
                />

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Insira um livro..."
                    placeholderTextColor="#3399ff"
                    autoCapitalize="none"
                    onChangeText={this.getChapter}
                />

                <TouchableOpacity
                    style={styles.find}
                    onPress={() => { this.findBook(this.state.abbrev, this.state.chapter) }}>
                    <Text style={styles.findButtonText}> Find </Text>
                </TouchableOpacity>

                {/* <View style={styles.container_text}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={this.state.rows}
                        keyExtractor={item => item.verseNumber.toString()}
                        renderItem={this.renderItem}
                    />
                </View> */}

            </View>
        )
    }
}

const styles = StyleSheet.create({

    input: {
        margin: 15,
        height: 40,
        borderColor: '#3399ff',
        borderWidth: 1
    },

    container: {
        paddingTop: 23,
        flexGrow: 1,
    },

    find: {
        backgroundColor: '#3399ff',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    findButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    container_text: {
        flex: 1,
    },
})

