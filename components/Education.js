import React from "react";
import Tabs from "./Tabs";

const Education = ({ route, navigation }) => {
  const { params } = route;
  return <Tabs params={params} />;
};

export default Education;
