import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Picker } from '@react-native-picker/picker'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const WelcomeScreen = (props) => {

  const Stack = createStackNavigator();

  const UniversitiesScrollWheel = ({navigation}) => {
      const [university, setUniversity] = useState("initial");
      const [education, setEducation] = useState("initial");
      return (
          <View style={styles.container}>
              <View style={{flex:1}}>
                  <Text style={{fontSize: 18,}}>Vælg universitet</Text>
                  <Picker
                      selectedValue={university}
                      style={{height: 10, width: 250 }}
                      onValueChange={(itemValue, itemIndex) => setUniversity(itemValue)}
                  >
                      <Picker.Item label="-" value="initial" />
                      <Picker.Item label="JavaScript" value="js" />
                  </Picker>
              </View>

              <View style={{flex:1}}>
                  <Text style={{fontSize: 18,}}>Vælg uddannelse</Text>
                  <Picker
                      selectedValue={education}
                      style={{height: 10, width: 250 }}
                      onValueChange={(itemValue, itemIndex) => setEducation(itemValue)}
                  >
                      <Picker.Item label="-" value="initial" />
                      <Picker.Item label="JavaScript" value="js" />
                  </Picker>
              </View>
          </View>
      );
  }
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Universities'} component={UniversitiesScrollWheel}/>

            </Stack.Navigator>
        </NavigationContainer>
    )



  // Når uddannelse er valgt, mount Education komponent, med valgte uddannelse som prop
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    }
});
export default WelcomeScreen;
