import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../User';
import commonStyles from '../constants/styles';

export default class ProfileScreen extends Component {

    static navigationOptions = {
        title: 'Profile'
    }

    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        const { container, textStyle, buttonStyle } = commonStyles;
        const { buttonContainer } = styles;
        return (
            <SafeAreaView style={container}>
                <Text style={textStyle}>{User.phone}</Text>
                <Text style={textStyle}>{User.name}</Text>
                <TouchableOpacity onPress={this.logOut} style={buttonContainer}>
                    <Text style={buttonStyle}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
    },
});