import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import User from '../User';
import styles from '../constants/styles'

export default class ProfileScreen extends Component {

    static navigationOptions = {
        title: 'Profile'
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 20 }}>{User.phone}</Text>
                <Text style={{ fontSize: 20 }}>{User.name}</Text>
                <TouchableOpacity onPress={this._logOut} style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                    <Text style={styles.textStyle}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}