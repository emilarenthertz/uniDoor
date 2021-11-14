import React from "react";
import firebase from "firebase/app";
import WelcomeScreen from "./components/WelcomeScreen";
import firebaseConfig from "./config";
import Education from "./components/Education";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // TODO: replace below with WelcomeScreen
  return <Education />;
}
