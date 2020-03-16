import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Navigation, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { Header } from 'react-native/Libraries/NewAppScreen';
import CustomIcon from '../components/CustomIcon/index';
import loader from './../services/loader';

export default class Main extends Component {

    state = {
        rows: [],
        chapterBook: '',
        titleBook: '',
        chapterLimit: 0,
        abbrev: '',
        books: '',
        loading: false,
    }
    componentDidMount() {
        this.getAbrrevChapter()
        this.requestBookApi()
        this.inSelected = this.props.navigation.getParam("func")
        this.selectedBook = this.props.navigation.getParam("increaseBook")
        this.inSelectedBook = this.props.navigation.getParam("funcBook")
    }

    getAbrrevChapter = async () => {
        this.findBook(this.props.navigation.state.params.abbrev, this.props.navigation.state.params.chapter)
        this.setState({ abbrev: this.props.navigation.state.params.abbrev, chapterLimit: this.props.navigation.state.params.chapterLimit })
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

    findBook = async (abbrev, chapter) => {
        this.setState({ loading: true })
        this.renderLoading(this.state.loading)
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
            abbrev: abbrev,
            loading: false
        })
        this.renderLoading(this.state.loading)
    }

    incrementChapter = () => {
        if (this.state.chapterBook < this.state.chapterLimit) {
            this.findBook(this.state.abbrev, this.state.chapterBook + 1)
            this.inSelected(this.state.chapterBook + 1)
        } else {
            let index = this.state.books.findIndex((item) => {
                console.log(item); return item.abbrev === this.state.abbrev
            })

            if (index < this.state.books.length - 1) {
                this.setState({ chapterLimit: this.state.books[index + 1].chapter })
                this.findBook(this.state.books[index + 1].abbrev, 1)
                this.inSelectedBook(this.state.books[index + 1])
                this.selectedBook(this.state.books[index + 1].abbrev)
                this.inSelected(1)
            } else {
                console.log('acabou as paginas') //ocultar botao
            }
        }
    }

    decreaseChapter = () => {
        if (this.state.chapterBook > 1) {
            this.findBook(this.state.abbrev, this.state.chapterBook - 1)
            this.inSelected(this.state.chapterBook - 1)
        } else {
            let index = this.state.books.findIndex((item) => {
                console.log(item); return item.abbrev === this.state.abbrev
            })

            if (index > 0) {
                this.setState({ chapterLimit: this.state.books[index - 1].chapter })
                this.findBook(this.state.books[index - 1].abbrev, this.state.books[index - 1].chapter)
                this.inSelectedBook(this.state.books[index - 1].abbrev)
                this.selectedBook(this.state.books[index - 1].abbrev)
                this.inSelected(1)
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

    renderLoading = () => {

        if (this.state.loading) {
            return (
                <View style={[styles.containerLoad, styles.horizontal]}>
                    <ActivityIndicator size={60} color="#959595" />
                </View>
            )
        }
    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.return}
                    onPress={() => {
                        console.log(this.state.abbrev);
                        this.props.navigation.navigate("navigationTop", {
                            abbrev: this.state.abbrev,
                            parametro: 'text'
                        })
                    }}>
                    <Text style={styles.title}>  {this.state.titleBook} {this.state.chapterBook} </Text>
                    <Image style={{
                        height: 8,
                        width: 8,
                        marginLeft: 5,
                        marginTop: 5,
                        alignSelf: 'center',
                    }}
                        source={{ uri: `https://www.pngrepo.com/download/108052/arrow-down-filled-triangle.png` }} />
                </TouchableOpacity>
                {/* colaca algo aqui depois */}
            </View>
        )
    }

    render() {
        return (
            <View >

                {this.renderHeader()}

                <FlatList
                    style={styles.flatlist}
                    contentContainerStyle={{ paddingBottom: 85 }}
                    data={this.state.rows}
                    keyExtractor={item => item.verseNumber.toString()}
                    renderItem={this.renderItem}
                />

                {this.renderLoading()}

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
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'arial',
    },

    verses: {
        fontSize: 15,
        textAlign: 'auto',
        fontFamily: 'GentiumPlus-I',
        color: '#202020',
    },

    textBox: {
        alignSelf: 'auto',
        textAlign: 'justify',
        marginTop: 5,
    },

    flatlist: {
        paddingHorizontal: 15,
        backgroundColor: '#F4F4F4'
    },

    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        shadowColor: "#000",
        shadowOffset: {
            width: -20,
            height: -20,
        },
        shadowOpacity: 0.40,
        shadowRadius: 4.65,
        elevation: 5,
    },

    return: {
        flexDirection: 'row',
        marginLeft: 15,
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
    },

    containerLoad: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 130,
    },

    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
});