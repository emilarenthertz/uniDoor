import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";

const Education = ({ education }) => {
  return (
    <NavigationContainer>
      <Tabs education={education} />
    </NavigationContainer>
  );
};

export default Education;
