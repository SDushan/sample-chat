import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import firebase from 'firebase';
import User from '../User';
import commonStyles from '../constants/styles';

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

    renderItems = ({ item }) => {
        const { receiveChatStyle, sendChatStyle, chatMsgStyle, chatTime } = styles;
        return (
            <View style={[item.name == User.phone ? sendChatStyle : receiveChatStyle]}>
                <Text style={chatMsgStyle}>{item.message}</Text>
                <Text style={chatTime}>{this.convertTime(item.time)}</Text>
            </View>
        )
    }

    render() {
        const { messageList, text } = this.state;
        const { inputStyle, buttonStyle } = commonStyles;
        const { container, inputWrapper, buttonContainer } = styles;
        return (
            <SafeAreaView>
                <FlatList
                    style={container}
                    data={messageList}
                    renderItem={this.renderItems}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={inputWrapper}>
                    <TextInput
                        style={inputStyle}
                        value={text}
                        placeholder='Type message...'
                        onChangeText={this.onHandleChange('text')}
                    />
                    <TouchableOpacity onPress={this.onSendMessage} style={buttonContainer}>
                        <Text style={buttonStyle}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '90%'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5
    },
    buttonContainer: {
        paddingBottom: 10,
        marginLeft: 5
    },
    receiveChatStyle: {
        flexDirection: 'row',
        width: '60%',
        alignSelf: 'flex-start',
        backgroundColor: '#7cb342',
        borderRadius: 5,
        marginBottom: 10
    },
    sendChatStyle: {
        flexDirection: 'row',
        width: '60%',
        alignSelf: 'flex-end',
        backgroundColor: '#00897b',
        borderRadius: 5,
        marginBottom: 10
    },
    chatMsgStyle: {
        color: '#fff',
        padding: 7,
        fontSize: 16
    },
    chatTime: {
        color: '#eee',
        padding: 3,
        fontSize: 12
    }
});