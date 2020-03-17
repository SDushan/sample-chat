import React from "react";
import { SafeAreaView, TextInput, AsyncStorage, TouchableOpacity, Alert, Text } from "react-native";
import User from '../User'
import styles from '../constants/styles'
import firebase from 'firebase';

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    name: "",
    phone: ""
  };

  // async componentDidMount() {
  //   try {
  //     const value = await AsyncStorage.getItem("mobile");
  //     if (value !== null) {
  //       this.setState({
  //         phone: value
  //       });
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // }

  onChangeNumber = value => {
    this.setState({
      phone: value
    });
  };

  onChangeName = value => {
    this.setState({
      name: value
    });
  };

  onHandleSubmit = async () => {
    const { phone, name } = this.state;
    if (phone.length < 10) {
      Alert.alert("Error", "Invalid phone number");
    } else if (name.length < 3) {
      Alert.alert("Error", "Invalid name");
    } else {
      await AsyncStorage.setItem("mobile", this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({ name: this.state.name })
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Phone Number"
          style={styles.inputStyle}
          keyboardType="numeric"
          onChangeText={this.onChangeNumber}
          value={this.state.phone}
        />
        <TextInput
          placeholder="Name"
          style={styles.inputStyle}
          onChangeText={this.onChangeName}
          value={this.state.name}
        />

        <TouchableOpacity onPress={this.onHandleSubmit}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
