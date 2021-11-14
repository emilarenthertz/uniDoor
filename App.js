import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import firebase from "firebase/app";
import firebaseConfig from "./config";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./components/WelcomeScreen";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
        <WelcomeScreen />
  );
}
