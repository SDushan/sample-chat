import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase";
import User from "../User";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount() {
    // Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBuGYNj1hJ4vXKhAHDFuQ_id0q9ZsM5XHE",
      authDomain: "simplechat-6a179.firebaseapp.com",
      databaseURL: "https://simplechat-6a179.firebaseio.com",
      projectId: "simplechat-6a179",
      storageBucket: "simplechat-6a179.appspot.com",
      messagingSenderId: "801731133585",
      appId: "1:801731133585:web:aa8eed4133a39338a6bf30",
      measurementId: "G-6SFMB549B3"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem("phone");
    this.props.navigation.navigate(User.phone ? "App" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
