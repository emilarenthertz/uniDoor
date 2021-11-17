import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import EducationSearch from "./EducationSearch";
import Education from "./Education";

const WelcomeScreen = (props) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"EducationSearch"}
          component={EducationSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Education"}
          component={Education}
          options={({ route }) => ({
            headerTitle: route.params.educationName,
            headerBackTitle: "Tilbage",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // Når uddannelse er valgt, mount Education komponent, med valgte uddannelse som prop
};

export default WelcomeScreen;
