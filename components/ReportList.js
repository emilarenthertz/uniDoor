import React from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import firebase from "firebase";

// Look at ex5 for inspiration into how to use navigation.navigate()

const ReportList = ({ children }) => {
  const [report, setReport] = React.useState();

  React.useEffect(() => {
    if (!report) {
      firebase
        .database()
        .ref(`/universiteter/1/uddannelser/1`)
        .on("value", (snapshot) => {
          setReport(snapshot.val());
        });
    }
  }, []);

  if (!report) {
    return <Text>Indlæser beretninger...</Text>;
  }

  console.log(report);

  // const handleSelect = (id) => {
  //   const uddannelse = Object.entries(report).find(
  //     (uddannelse) => uddannelse[0] === id
  //   );
  //   navigation.navigate("ReportDetails", { uddannelse });
  // };

  const uddannelsesArray = Object.values(report);
  const uddannelsesKeys = Object.keys(report);

  return (
    // <SafeAreaView>
    <Text>fisk</Text>
    // <FlatList
    //   data={uddannelsesArray}
    //   keyExtractor={(index) => uddannelsesKeys[index]}
    //   renderItem={({ item, index }) => (
    //     <TouchableOpacity
    //       style={styles.container}
    //       // onPress={() => handleSelect(uddannelsesKeys[index])}
    //       key={index}
    //     >
    //       <Text>{item.navn}</Text>
    //     </TouchableOpacity>
    //   )}
    // />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    height: 50,
    justifyContent: "center",
  },
});

export default ReportList;
