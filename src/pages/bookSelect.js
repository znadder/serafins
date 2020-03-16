import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Navigation, TouchableOpacity, Image } from 'react-native';
import api from '../services/api';

export default class bookSelect extends Component {

    state = {
        books: '',
        selected: '',
        selected_abbrev: '',
        selected_chapter: 1,
        abbrev: 'gn'
    }

    componentDidMount() {
        this.requestBookApi()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.screenProps.rootNavigation.getParam('parametro')) {
            this.props.navigation.navigate('Books')
            console.log(nextProps.screenProps.rootNavigation.state.params.abbrev)
            this.setState({ abbrev: nextProps.screenProps.rootNavigation.state.params.abbrev})
        }
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
            this.setState({ books: abrev })
        } catch (error) {
            console.log(error)
        }
    }

    selectedBook = (item) => {
        this.setState({
            selected: item.name,
            selected_abbrev: item.abbrev,
            abbrev: item.abbrev,
        })
    }

    increaseSelectedBook = async ({ abbrev }) => {
        const responseBook = await api.get(`/books/${abbrev}`)
        this.setState({
            selected: responseBook.data.name,
            selected_abbrev: abbrev
        })
    }

    getChapter = (chapter) => {
        this.setState({
            selected_chapter: chapter,
        })
    }

    increaseSelected = (num) => {
        this.setState({ selected: num })
    }

    // goToverseText = () => {
    //     console.log('entrei na funcao')
    //     if (this.state.selected_abbrev != '' && this.state.selected_chapter != '') {
    //         console.log('passei no if')
    //         console.log(this.state.selected_abbrev)
    //         this.props.screenProps.rootNavigation.navigate("versesText", {
    //             abbrev: this.state.selected_abbrev,
    //             chapter: this.state.selected_chapter,
    //         })
    //     } else {
    //         console.log('nao passei no if')
    //         console.log(this.state.selected_abbrev)
    //         this.props.screenProps.rootNavigation.navigate("versesText", {
    //             abbrev: 'gn',
    //             chapter: '1',
    //         })
    //     }
    // }

    renderItem = ({ item }) => {
        return (
            <View style={styles.textBox}>
                <TouchableOpacity onPress={() => {
                    this.selectedBook(item);
                    console.log(this.state.abbrev)
                    this.props.navigation.navigate("Chapters",
                        {
                            abbrev: this.state.abbrev,
                            books: this.state.books,
                            funcSelBook: this.increaseSelectedBook,
                            getNum: this.getChapter
                        })
                }}>
                    <Text style={this.state.selected == item.name ? styles.selectedName : styles.name}>   {item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flatlistView}>
                    <FlatList
                        style={styles.flatlist}
                        //contentContainerStyle={{ paddingBottom: 85 }}
                        data={this.state.books}
                        keyExtractor={item => item.name}
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={{ position: 'absolute', bottom: 20, right: 15 }}>
                    <TouchableOpacity
                        style={styles.navigateBottonL}
                        onPress={() => { this.goToverseText() }}>
                        <Image style={greenButton.button}
                            source={{ uri: `https://cdn.pixabay.com/photo/2013/07/13/10/06/affirmative-156538_960_720.png` }} />
                        {/* botao esquerdo */}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: '#F3F3F3'
    },

    selectedName: {
        fontSize: 25,
        textAlign: 'auto',
        fontFamily: 'GentiumPlus-I',
        color: '#049BAC',
    },

    name: {
        fontSize: 22,
        textAlign: 'auto',
        fontFamily: 'GentiumPlus-I',
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
        borderColor: '#F1F7FF', //#EEF6FF #E5E5E5
        backgroundColor: '#F4F4F4'
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
        paddingBottom: 10,
    },
});

const greenButton = StyleSheet.create({
    button: {
        height: 60,
        width: 60,
    },

    navigateBottonL: {
        height: 40,
        width: 40,
        position: "absolute",
        bottom: 40,
        left: 20,
    },
})