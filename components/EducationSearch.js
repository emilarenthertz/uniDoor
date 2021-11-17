import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

const EducationSearch = ({ navigation }) => {
  const [universities, setUniversities] = useState([]);
  const [universityIndex, setUniversityIndex] = useState("initial");

  const [educationOptions, setEducationOptions] = useState([]);
  const [educationIndex, setEducationIndex] = useState("initial");

  useEffect(() => {
    try {
      firebase
        .database()
        .ref(`/universiteter`)
        .on("value", (snapshot) => {
          setUniversities(snapshot.val());
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!universities) {
    return <Text>Loading...</Text>;
  }

  const uniOptions = universities.map((uni, index) => {
    return <Picker.Item label={uni.navn} value={index} key={index} />;
  });

  const universitySelected = (value) => {
    if (value !== "initial") {
      setUniversityIndex(value);
      setEducationIndex("initial");
      setEducationOptions(
        universities[value].uddannelser.map((edu, index) => {
          return <Picker.Item label={edu.navn} value={index} key={index} />;
        })
      );
    } else {
      setEducationOptions([]);
      setUniversityIndex("initial");
      setEducationIndex("initial");
    }
  };

  const educationSelected = (value) => {
    setEducationIndex(value);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 250, width: 250, marginTop: 35 }}
        source={require("../assets/uniDoor_transparent.png")}
      />
      <Picker
        selectedValue={universityIndex}
        style={{ height: 10, width: 350, marginTop: 0 }}
        onValueChange={universitySelected}
      >
        <Picker.Item label="Vælg universitet" value="initial" key="initial" />
        {uniOptions}
      </Picker>
      {educationOptions.length ? (
        <>
          <Picker
            selectedValue={educationIndex}
            style={{ width: 250, marginTop: 150 }}
            onValueChange={educationSelected}
          >
            <Picker.Item
              label="Vælg uddannelse"
              value="initial"
              key="initial"
            />
            {educationOptions}
          </Picker>
          {educationIndex !== "initial" ? (
            <Button
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate("Education", {
                  educationName:
                    universities[universityIndex].uddannelser[educationIndex]
                      .navn,
                  schoolId: universityIndex,
                  educationId: educationIndex,
                })
              }
              title="Vis beretninger"
            />
          ) : null}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default EducationSearch;
