import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { StyleSheet, Text, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Education from "./Education";

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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 18 }}>Universitet</Text>
          <Picker
            selectedValue={universityIndex}
            style={{ height: 10, width: 350 }}
            onValueChange={universitySelected}
          >
            <Picker.Item
              label="Vælg universitet"
              value="initial"
              key="initial"
            />
            {uniOptions}
          </Picker>
        </View>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {educationOptions.length ? (
            <>
              <Text style={{ fontSize: 18 }}>Vælg uddannelse</Text>
              <Picker
                selectedValue={educationIndex}
                style={{ flex: 1, width: 250 }}
                onValueChange={educationSelected}
              >
                <Picker.Item
                  label="Vælg uddannelse"
                  value="initial"
                  key="initial"
                />
                {educationOptions}
              </Picker>
              <View style={{ flex: 1 }}>
                {educationIndex !== "initial" ? (
                  <Button
                    onPress={() =>
                      navigation.navigate("Education", {
                        schoolId: universityIndex,
                        educationId: educationIndex,
                      })
                    }
                    title="Vis beretninger"
                  />
                ) : null}
              </View>
            </>
          ) : null}
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EducationSearch;
