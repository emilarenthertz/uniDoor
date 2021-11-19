import React from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { Card } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import firebase from "firebase";

const CreateReport = ({ valgtUddannelse, query, navigation}) => {
  const [uddannelse, setUddannelse] = React.useState();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [pickedIndex, setPickedIndex] = React.useState("initial");
  const initialDescriptionStyle = {
      fontSize: 40,
      borderWidth: 0,
      height: 50,
  }

  const [descriptionStyle, setDescriptionStyle] = React.useState(initialDescriptionStyle);

  React.useEffect(() => {
    if (!uddannelse) {
      setUddannelse(valgtUddannelse);
    }
  }, [valgtUddannelse]);

  if (!uddannelse) {
    return <Text>Indlæser ...</Text>;
  }

  const onFocus = () => {
      setDescriptionStyle({
          fontSize: 0,
          height: 200,
          borderColor: '#EAE9EB',
          borderWidth: 1,
          textAlignVertical: "top",
          paddingHorizontal: 5,
          paddingVertical: 5,
      })
  }

  const onBlur = () => {
      setDescriptionStyle(initialDescriptionStyle)
  }

  const submit = async () => {

      const report = {
          category: "test",
          date: Date.now(),
          description: description,
          rating: 0,
          title: title,
          user: "test"
      }

      const reports = [...valgtUddannelse.reports, report]

      try {
          await firebase
              .database()
              .ref(`${query}/reports`)
              .set(reports);
      } catch (error) {
          console.log(error);
          return `Error: ${error.message}`;
      }
  }

  return (
    <Card>
        <TextInput
          placeholder={'Titel'}
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={[styles.input, styles.normalInputHeight]}
        />
        <Card.Divider />
          <RNPickerSelect
            style={customPickerStyles}
            onValueChange={(value) => setPickedIndex(value)}
            placeholderTextColor={'DD0000'}
            placeholder={{ label: "Kategori", value: "initial" }}
            items={[
              { label: "Kantine", value: "0" },
              { label: "Arbejdsbyrde", value: "1" },
              { label: "Studiejob", value: "2" },
              { label: "Socialt", value: "3" },
              { label: "Faciliteter", value: "4" },
              { label: "Eksaminer", value: "4" },
            ]}
          />
          <Card.Divider />
        <TextInput
          value={description}
          placeholder={'Del din oplevelse'}
          onBlur={onBlur}
          onFocus={onFocus}
          onChangeText={(text) => setDescription(text)}
          style={descriptionStyle}
          multiline={true}
        />
        <Card.Divider />
        {title !== '' && pickedIndex !== 'initial' && description !== ''  ?
        <View style={{alignItems:'center'}}>
            <Pressable style={styles.button} onPress={submit}>
                <Text style={styles.text}>Opret</Text>
            </Pressable>
        </View>: null}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    paddingBottom: 5,
    textTransform: 'uppercase'
  },
  label: {
    fontWeight: "bold",
    alignItems: "center",
  },
  input: {
    fontSize: 40,
  },
  normalInputHeight: {
    height: 50,
  },

  button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "#0099FF",
      width: 150
  },
  text: {
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      color: 'white',
  },

});

const customPickerStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 40,
        height:50,
    },
    /*inputAndroid: {

    },*/
});

export default CreateReport;
