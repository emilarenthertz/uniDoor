import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReportList from "./ReportList";
import CreateReport from "./CreateReport";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      // screenOptions={{
      //   tabBarStyle: {
      //     position: "absolute",
      //     bottom: 25,
      //     left: 20,
      //     right: 20,
      //     elevation: 0,
      //     backgroundColor: "#FFFFFF",
      //     borderRadius: 15,
      //     height: 90,
      //     ...styles.shadow,
      //   },
      // }}
    >
      <Tab.Screen
        name="Liste"
        component={ReportList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              {/* <Image
                source={require("../assets/favicon.png")}
                resizeMode="contain"
                style={{
                  width: "25",
                  height: "25",
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              /> */}
              <Icon name="list" size={25} />
              <Text
                style={{ color: focused ? "#0099FF" : "#748c94", fontSize: 12 }}
              >
                Liste
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="Ny" component={CreateReport} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#0099FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
