import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import firebase from "firebase";

const CreateReport = ({ query }) => {
  const [uddannelse, setUddannelse] = React.useState();
  const [title, setTitle] = React.useState("");
  query = "/universiteter/0/uddannelser/1";

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

  if (!uddannelse) {
    return <Text>Indlæser ...</Text>;
  }

  return (
    <Card>
      <Card.Title>{uddannelse.navn}</Card.Title>
      <Card.Divider />
      <View>
        <Text style={styles.label}>Kategori:</Text>
        <TextInput
          value={title}
          onChangeText={(e) => setTitle(e.target?.value)}
          style={styles.input}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    width: 100,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    height: 50,
    flex: 1,
  },
});

export default CreateReport;
