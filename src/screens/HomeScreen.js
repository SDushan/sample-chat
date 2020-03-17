import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import firebase from 'firebase';
import User from '../User';

export default class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chats',
            headerright: (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../images/user.jpg')} style={{ width: 30, height: 30, marginRight: 5 }} />
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
            this.setState({
                users: [...this.state.users, person]
            })
        })
    }

    renderItems = ({ item }) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)} style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
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