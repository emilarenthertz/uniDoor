import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReportList from "./ReportList";
import CreateReport from "./CreateReport";
import Filters from "./Filters";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import * as Haptics from "expo-haptics";

const Tab = createBottomTabNavigator();

// TODO: make sure that back button is only visible on list screen and not the rest

// const customTabBarButton = x;

const Tabs = ({ params, navigation }) => {
  const [uddannelse, setUddannelse] = React.useState();

  const { schoolId, educationId } = params;
  const query = `/universiteter/${schoolId}/uddannelser/${educationId}`;

  React.useEffect(() => {
    if (!uddannelse) {
      firebase
        .database()
        .ref(query)
        .on("value", (snapshot) => {
          setUddannelse(snapshot.val());
        });
    }
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          ...styles.tabBarShadow,
        },
      }}
    >
      <Tab.Screen
        name="Oversigt"
        children={() => <ReportList query={query} />}
        listeners={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 12,
              }}
            >
              <Icon name="home" size={25} />
              <Text
                style={{
                  color: focused ? "#0099FF" : "#748c94",
                  fontSize: 12,
                  paddingTop: 8,
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
        children={() => (
          <CreateReport
            valgtUddannelse={uddannelse}
            query={query}
            navigation={navigation}
          />
        )}
        listeners={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 12,
              }}
            >
              <Icon name="plus" size={25} />
              <Text
                style={{
                  color: focused ? "#0099FF" : "#748c94",
                  fontSize: 12,
                  paddingTop: 8,
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
        children={() => (
          <Filters navigation={navigation} valgtUddannelse={uddannelse} />
        )}
        listeners={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 12,
              }}
            >
              <Icon name="filter" size={25} />
              <Text
                style={{
                  color: focused ? "#0099FF" : "#748c94",
                  fontSize: 12,
                  paddingTop: 8,
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
