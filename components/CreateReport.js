import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

const CreateReport = ({ valgtUddannelse }) => {
  const [uddannelse, setUddannelse] = React.useState();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [pickedIndex, setPickedIndex] = React.useState("initial");

  React.useEffect(() => {
    if (!uddannelse) {
      setUddannelse(valgtUddannelse);
    }
  }, [valgtUddannelse]);

  if (!uddannelse) {
    return <Text>Indlæser ...</Text>;
  }

  console.log(defaultStyles);

  return (
    <Card>
      <Text style={styles.header}>Ny beretning</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Titel</Text>
        <TextInput
          value={description}
          onChangeText={(e) => setDescription(e.target?.value)}
          style={[styles.input, styles.normalInputHeight]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kategori</Text>
        <View
          style={[
            styles.picker,
            { height: 50, paddingHorizontal: 5, justifyContent: "center" },
          ]}
        >
          <RNPickerSelect
            onValueChange={(value) => setPickedIndex(value)}
            placeholder={{ label: "Vælg en kategori", value: "initial" }}
            items={[
              { label: "Kantine", value: "0" },
              { label: "Arbejdsbyrde", value: "1" },
              { label: "Studiejob", value: "2" },
              { label: "Socialt", value: "3" },
              { label: "Faciliteter", value: "4" },
              { label: "Eksaminer", value: "4" },
            ]}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Del din oplevelse</Text>
        <TextInput
          value={description}
          onChangeText={(e) => setDescription(e.target?.value)}
          style={[styles.input, styles.tallInputHeight]}
          multiline={true}
        />
      </View>
    </Card>
    /*<Card>
      <Card.Title>{uddannelse.navn}</Card.Title>
      <Card.Divider />
      <View>
        <Text style={styles.label}>Titel:</Text>
        <TextInput
          value={title}
          onChangeText={(e) => setTitle(e.target?.value)}
          style={styles.input}
        />
      </View>
      <View>
  
        <TextInput
          value={description}
          onChangeText={(e) => setDescription(e.target?.value)}
        />
      </View>
    </Card>*/
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
  },
  inputContainer: {
    paddingTop: 20,
  },
  label: {
    fontWeight: "bold",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  normalInputHeight: {
    height: 50,
  },
  tallInputHeight: {
    height: 200,
    textAlignVertical: "top",
  },
  picker: {
    borderWidth: 1,
    borderRadius: 15,
    color: "black",
  },
});

export default CreateReport;
