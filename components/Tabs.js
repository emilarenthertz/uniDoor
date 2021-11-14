import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReportList from "./ReportList";
import CreateReport from "./CreateReport";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

// Link til youtube guide: https://www.youtube.com/watch?v=gPaBicMaib4

const Tabs = ({ education }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBar,
          ...styles.tabBarShadow,
        },
      }}
    >
      <Tab.Screen
        name="Oversigt"
        children={() => <ReportList>{education}</ReportList>}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 7,
              }}
            >
              <Icon name="home" size={25} />
              <Text
                style={{
                  color: focused ? "#0099FF" : "#748c94",
                  fontSize: 12,
                  paddingTop: 5,
                }}
              >
                Oversigt
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Skriv beretning"
        component={CreateReport}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 7,
              }}
            >
              <Icon name="plus" size={25} />
              <Text
                style={{
                  color: focused ? "#0099FF" : "#748c94",
                  fontSize: 12,
                  paddingTop: 5,
                }}
              >
                Skriv beretning
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Filtrer"
        // TODO: replace below component
        component={CreateReport}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 7,
              }}
            >
              <Icon name="filter" size={25} />
              <Text
                style={{
                  color: focused ? "#0099FF" : "#748c94",
                  fontSize: 12,
                  paddingTop: 5,
                }}
              >
                Filtrer
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    height: 90,
  },
  tabBarShadow: {
    shadowColor: "#0099FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;