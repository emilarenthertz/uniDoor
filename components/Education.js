import React from "react";
import Tabs from "./Tabs";

const Education = ({ route, navigation }) => {
  console.log(route.params);
  const education = "laks";
  return <Tabs education={education} />;
};

export default Education;
