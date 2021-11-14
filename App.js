import React from "react";
import { StyleSheet } from "react-native";
import firebase from "firebase/app";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./components/WelcomeScreen";

import { NavigationContainer } from "@react-navigation/native";

// TODO: Flyt values til .env
const firebaseConfig = {
  apiKey: "AIzaSyBDdA-lHM7ZFnG1sMYhaV1Lqk8Ke3y0PnA",
  authDomain: "unidoor-3071f.firebaseapp.com",
  projectId: "unidoor-3071f",
  storageBucket: "unidoor-3071f.appspot.com",
  messagingSenderId: "760518433431",
  appId: "1:760518433431:web:08ca5959887b4495a367d2",
  databaseURL:
    "https://unidoor-3071f-default-rtdb.europe-west1.firebasedatabase.app/",
};

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return <WelcomeScreen />;
}
