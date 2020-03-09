import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Navigation, TouchableOpacity, Image } from 'react-native';
import api from '../services/api';
import { Header } from 'react-native/Libraries/NewAppScreen';
import CustomIcon from '../components/CustomIcon/index'

export default class Main extends Component {

    state = {
        rows: [],
        chapterBook: '',
        titleBook: '',
    }
    componentDidMount() {
        this.getAbrrevChapter()
    }

    getAbrrevChapter = () => {
        this.findBook(this.props.navigation.state.params.abrrev, this.props.navigation.state.params.chapter)
    }

    findBook = async (abbrev, chapter) => {
        console.log(abbrev, chapter)
        const responseBook = await api.get(`/verses/nvi/${abbrev}/${chapter}`)
        this.setState({ rows: [] })
        let rows = []
        let obj = {}
        for (let i = 0; i < responseBook.data.chapter.verses; i++) {
            obj.verseNumber = responseBook.data.verses[i].number
            obj.verse = responseBook.data.verses[i].text
            rows.push(obj)
            obj = {}
        }
        this.setState({
            rows: rows,
            chapterBook: responseBook.data.chapter.number,
            titleBook: responseBook.data.book.name
        })
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.textBox}>
                <Text style={styles.verses}>{item.verseNumber} :  {item.verse}.</Text>
            </View>
        )
    }

    render() {
        return (
            <View >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.return}
                        onPress={() => { this.props.navigation.navigate("Main") }}>
                        <Image style={{
                            height: 18,
                            width: 18,
                        }}
                            source={{ uri: `https://pngimage.net/wp-content/uploads/2018/06/return-button-png-2.png` }} />
                    </TouchableOpacity>
                    <Text style={styles.title}>  {this.state.titleBook} {this.state.chapterBook} </Text>
                </View>
                <FlatList
                    style={styles.flatlist}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    data={this.state.rows}
                    keyExtractor={item => item.verseNumber.toString()}
                    renderItem={this.renderItem}
                />
                <View style={styles.navigateBotton}>
                    <TouchableOpacity
                        onPress={() => { console.log('CLICOU') }}>
                        <Image style={styles.navigateBottonLeft}
                            source={{ uri: `https://cdn0.iconfinder.com/data/icons/controls-add-on/48/v-35-512.png` }} />
                        {/* botao esquerdo */}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { console.log('CLICOU') }}>
                        <Image style={styles.navigateBottonRight}
                            source={{ uri: `https://cdn0.iconfinder.com/data/icons/controls-add-on/48/v-35-512.png` }} />
                        {/* botao direito */}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'GentiumPlus-I',
    },

    verses: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'GentiumPlus-I',
        color: '#202020',
    },

    textBox: {
        alignSelf: 'auto',

    },

    flatlist: {
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: '#F4F4F4'
    },

    header: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },

    navigateBottonLeft: {
        flex: 1,
        position: "absolute",
        bottom: 40,
        left: 20,
        height: 40,
        width: 40,
        backgroundColor: 'red'
    },

    navigateBottonRight: {
        flex: 1,
        position: "absolute",
        bottom: 40,
        right: 20,
        height: 40,
        width: 40,
        backgroundColor: 'green'
    },
});