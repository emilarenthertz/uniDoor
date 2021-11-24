import React from "react";
import firebase from "firebase/app";
import firebaseConfig from "./config";
import WelcomeScreen from "./components/WelcomeScreen";
import { LogBox } from "react-native";

// To hide warnings
LogBox.ignoreAllLogs(true);

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return <WelcomeScreen />;
}
