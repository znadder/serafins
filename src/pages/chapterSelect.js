import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Navigation, TouchableOpacity, Dimensions, } from 'react-native';
import api from '../services/api';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const { width } = Dimensions.get('window');

export default class chapterSelect extends Component {

    state = {
        chapters: [],
        chapterLimit: 1,
        abbrev: 'gn',
        loading: false,
        selected: '',

    }

    increaseSelectedBook = (text) => {
        this.setState({
            abbrev: text
        })
        console.log(this.state.abbrev, text)
    }

    componentDidMount() {
        if (this.props.navigation.getParam('abbrev')) {
            this.getChapters(this.props.navigation.state.params.abbrev)
            this.setState({ abbrev: this.props.navigation.state.params.abbrev })
        } else {
            this.getChapters('gn')
            this.setState({ abbrev: 'gn' })
        }
        this.inSelectedBook = this.props.navigation.getParam("funcSelBook")
        this.getNumChapter = this.props.navigation.getParam("getNum")
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'chapterSelect')
        if (nextProps.navigation.state.params.abbrev != this.state.abbrev) {
            //         this.getChapters(nextProps.navigation.state.params.abbrev)
            this.setState({ abbrev: nextProps.navigation.state.params.abbrev })
        }
        // else {
        //     if (nextProps.screenProps.rootNavigation.state.params.abbrev != this.state.abbrev) {
        //         this.getChapters(nextProps.screenProps.rootNavigation.state.params.abbrev)
        //         this.setState({ abbrev: nextProps.screenProps.rootNavigation.state.params.abbrev })
        //     }
        // }
        // console.log(nextProps.screenProps.rootNavigation.state.params.abbrev, 'nextProps')
        // console.log(this.props.screenProps.rootNavigation.state.params, 'root')
    }

    getChapters = async (abbrev) => {
        this.setState({ loading: true, chapters: [] })
        this.renderLoading()
        const responseChapters = await api.get(`/books/${abbrev}`)
        var chapterLimit = responseChapters.data.chapters
        var nums = []

        for (let i = 1; i <= chapterLimit; i++) {
            nums.push(i)
        }

        this.setState({
            chapters: nums,
            chapterLimit: chapterLimit,
            abbrev: abbrev,
            loading: false
        })
        this.renderLoading()
    }

    selectedBook = (item) => {
        this.setState({ selected: item })
    }

    increaseSelected = (num) => {
        this.setState({ selected: num })
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.textBox}>
                <TouchableOpacity onPress={() => {
                    this.selectedBook(item); this.props.screenProps.rootNavigation.navigate("versesText",
                        {
                            abbrev: this.state.abbrev,
                            chapter: item,
                            chapterLimit: this.state.chapterLimit,
                            func: this.increaseSelected,
                            funcBook: this.inSelectedBook,
                            increaseBook: this.increaseSelectedBook
                        })
                }}>

                    <Text style={this.state.selected == item ? styles.selectedName : styles.name}>{item}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderLoading = () => {
        if (this.state.loading) {
            return (
                [1, 2].map((index) =>
                    <ShimmerPlaceHolder
                        key={index}
                        style={{ height: 30, width: "100%", marginBottom: 10, marginTop: 10, }}
                        autoRun={true} />
                )
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>

                {this.renderLoading()}

                <FlatList
                    style={styles.flatlist}
                    numColumns={4}
                    horizontal={false}
                    // contentContainerStyle={{ paddingBottom: 85 }}
                    data={this.state.chapters}
                    keyExtractor={item => item.toString()}
                    renderItem={this.renderItem}
                />



                <Text>Oi</Text>
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
        fontSize: 32,
        textAlign: 'center',
        fontFamily: 'GentiumPlus-I',
        color: '#049BAC',
    },

    name: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'GentiumPlus-I',
        color: '#393939',
    },

    textBox: {
        width: width / 4,
        alignSelf: 'center',
        textAlign: 'center',
        paddingHorizontal: 30,
        marginBottom: 12,
        borderColor: '#E5E5E5',
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
    },

    flatlist: {
        // flexGrow: 1,
        // paddingRight: 15,
        // paddingLeft: 15,
        // paddingBottom: 80,
        // width: 400,
        flexWrap: 'wrap',
        backgroundColor: '#F3F3F3',
    },
})