import React from "react";
import { SafeAreaView, TextInput, AsyncStorage, TouchableOpacity, Alert, Text } from "react-native";
import firebase from 'firebase';
import User from '../User';
import commonStyles from '../constants/styles';

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
  //     const value = await AsyncStorage.getItem("phone");
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
      await AsyncStorage.setItem("phone", phone);
      User.phone = phone;
      firebase.database().ref('users/' + User.phone).set({ name: name })
      this.props.navigation.navigate('App');
    }
  };

  render() {
    const { phone, name } = this.state;
    const { container, inputStyle, buttonStyle } = commonStyles;
    return (
      <SafeAreaView style={container}>
        <TextInput
          placeholder="Phone Number"
          style={inputStyle}
          keyboardType="numeric"
          onChangeText={this.onChangeNumber}
          value={phone}
        />
        <TextInput
          placeholder="Name"
          style={inputStyle}
          onChangeText={this.onChangeName}
          value={name}
        />
        <TouchableOpacity onPress={this.onHandleSubmit}>
          <Text style={buttonStyle}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
