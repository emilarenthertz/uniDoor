import React from "react";
import firebase from "firebase/app";
import firebaseConfig from "./config";
import WelcomeScreen from "./components/WelcomeScreen";
import Education from "./components/Education";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return <Education />;
}
