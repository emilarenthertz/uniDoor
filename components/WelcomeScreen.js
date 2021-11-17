import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import EducationSearch from './EducationSearch.js'

const WelcomeScreen = (props) => {
  const Stack = createStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Educations'} component={EducationSearch}/>
            </Stack.Navigator>
        </NavigationContainer>
    )

  // Når uddannelse er valgt, mount Education komponent, med valgte uddannelse som prop
};

export default WelcomeScreen;
