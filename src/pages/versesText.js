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
        chapterLimit: 0,
        abbrev: '',
        books: '',
    }
    componentDidMount() {
        this.getAbrrevChapter()
    }

    getAbrrevChapter = async () => {
        this.findBook(this.props.navigation.state.params.abrrev, this.props.navigation.state.params.chapter)
        this.setState({ abbrev: this.props.navigation.state.params.abrrev, chapterLimit: this.props.navigation.state.params.chapterLimit, books: this.props.navigation.state.params.books })
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
        console.log(this.state.books)
    }

    findBook = async (abbrev, chapter) => {
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
            titleBook: responseBook.data.book.name,
            abbrev: abbrev
        })
    }

    incrementChapter = () => {
        if (this.state.chapterBook < this.state.chapterLimit) {
            this.findBook(this.state.abbrev, this.state.chapterBook + 1)
        } else {
            console.log(this.state.books)
            let index = this.state.books.findIndex((item) => {
                console.log(item); return item.abbrev === this.state.abbrev
            })

            console.log(index, this.state.books.length - 1)
            if (index < this.state.books.length - 1) {
                this.setState({ chapterLimit: this.state.books[index + 1].chapter })
                this.findBook(this.state.books[index + 1].abbrev, 1)
            } else {
                console.log('acabou as paginas') //ocultar botao
            }
        }
    }

    decreaseChapter = () => {
        if (this.state.chapterBook > 1) {
            this.findBook(this.state.abbrev, this.state.chapterBook - 1)
        } else {
            console.log(this.state.books)
            let index = this.state.books.findIndex((item) => {
                console.log(item); return item.abbrev === this.state.abbrev
            })

            if (index > 0) {
                this.setState({ chapterLimit: this.state.books[index - 1].chapter })
                this.findBook(this.state.books[index - 1].abbrev, this.state.books[index - 1].chapter)
            } else {
                console.log('acabou as paginas') //ocultar botao
            }
        }
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.textBox}>
                <Text style={styles.verses}>{item.verseNumber}:  {item.verse}.</Text>
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
                    {/* colaca algo aqui depois */}
                </View>
                <FlatList
                    style={styles.flatlist}
                    contentContainerStyle={{ paddingBottom: 85 }}
                    data={this.state.rows}
                    keyExtractor={item => item.verseNumber.toString()}
                    renderItem={this.renderItem}
                />
                <View>
                    <TouchableOpacity
                        style={styles.navigateBottonL}
                        onPress={() => { this.decreaseChapter() }}>
                        <Image style={styles.navigateBottonLeft}
                            source={{ uri: `https://cdn0.iconfinder.com/data/icons/controls-add-on/48/v-35-512.png` }} />
                        {/* botao esquerdo */}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navigateBottonR}
                        onPress={() => this.incrementChapter()}>
                        <Image style={styles.navigateBottonRight}
                            source={{ uri: `https://cdn0.iconfinder.com/data/icons/controls-add-on/48/v-35-512.png` }} />
                        {/* botao direito */}
                    </TouchableOpacity>
                </View>
            </View >
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
        textAlign: 'auto',
        fontFamily: 'GentiumPlus-I',
        color: '#202020',
    },

    textBox: {
        alignSelf: 'auto',
        textAlign: 'justify'
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
        backgroundColor: '#F4F6F6'
    },

    navigateBottonLeft: {
        height: 40,
        width: 40,
        backgroundColor: 'red'
    },

    navigateBottonRight: {
        height: 40,
        width: 40,
        backgroundColor: 'green'
    },

    navigateBottonR: {
        height: 40,
        width: 40,
        position: "absolute",
        bottom: 40,
        right: 20,
    },

    navigateBottonL: {
        height: 40,
        width: 40,
        position: "absolute",
        bottom: 40,
        left: 20,
    }
});