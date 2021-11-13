import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import firebase from 'firebase';
import User from '../User';
import commonStyles from '../constants/styles';

export default class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chats',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../../res/images/user.jpg')} style={styles.imgStyle} />
                </TouchableOpacity>
            )
        }
    }

    state = {
        users: []
    }

    componentDidMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            // if(person.phone === User.phone){
            //     User.name = person.name
            // } else {
            //     this.setState({
            //         users: [...this.state.users, person]
            //     })
            // }
            User.name = person.name
            this.setState({
                users: [...this.state.users, person]
            })
        })
    }

    renderItems = ({ item }) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)} style={styles.itemStyle}>
            <Text style={commonStyles.textStyle}>{item.name}</Text>
        </TouchableOpacity>
    )

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderItems}
                    keyExtractor={(item) => item.phone}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    imgStyle: {
        width: 30,
        height: 30,
        marginRight: 5
    },
    itemStyle: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
})