import React from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import firebase from "firebase";

const ReportList = ({ navigation }) => {
  const [uddannelser, setUddannelser] = React.useState();

  React.useEffect(() => {
    if (!uddannelser) {
      firebase
        .database()
        .ref(`/uddannelser`)
        .on("value", (snapshot) => {
          setUddannelser(snapshot.val());
        });
    }
  }, []);

  if (!uddannelser) {
    return <Text>Indlæser uddannelser...</Text>;
  }

  const handleSelect = (id) => {
    const uddannelse = Object.entries(uddannelser).find(
      (uddannelse) => uddannelse[0] === id
    );
    navigation.navigate("ReportDetails", { uddannelse });
  };

  const uddannelsesArray = Object.values(uddannelser);
  const uddannelsesKeys = Object.keys(uddannelser);

  return (
    // <SafeAreaView>
    <FlatList
      data={uddannelsesArray}
      keyExtractor={(index) => uddannelsesKeys[index]}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => handleSelect(uddannelsesKeys[index])}
          key={index}
        >
          <Text>{item.Navn}</Text>
        </TouchableOpacity>
      )}
    />
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
