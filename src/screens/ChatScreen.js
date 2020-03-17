import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native'
import firebase from 'firebase';
import User from '../User';
import styles from '../constants/styles';

export default class ChatScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
            },
            text: '',
            messageList: []
        }
    }

    componentDidMount() {
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
            .on('child_added', (value) => {
                this.setState({
                    messageList: [...this.state.messageList, value.val()]
                })
            })
    }

    onHandleChange = key => val => {
        this.setState({
            [key]: val
        })
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }

    onSendMessage = async () => {
        if (this.state.text.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {}
            let message = {
                message: this.state.text,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message;
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ text: '' })
        }
    }

    renderItems = ({ item }) => (
        <View style={{
            flexDirection: 'row',
            width: '60%',
            alignSelf: item.name == User.phone ? 'flex-end' : 'flex-start',
            backgroundColor: item.name == User.phone ? '#00897b' : '#7cb342',
            borderRadius: 5,
            marginBottom: 10
        }}>
            <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>{item.message}</Text>
            <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>{this.convertTime(item.time)}</Text>
        </View>
    )

    render() {

        let { height } = Dimensions.get('window');

        return (
            <SafeAreaView>
                <FlatList
                    style={{ padding: 10, height: height * 0.6 }}
                    data={this.state.messageList}
                    renderItem={this.renderItems}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.text}
                        placeholder='Type message...'
                        onChangeText={this.onHandleChange('text')}
                    />
                    <TouchableOpacity onPress={this.onSendMessage} style={{ paddingBottom: 10, marginLeft: 5 }}>
                        <Text style={styles.textStyle}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}