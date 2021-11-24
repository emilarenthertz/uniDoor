import React from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { Card } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import firebase from "firebase";
import RadioButtonRN from "radio-buttons-react-native";

const Filters = ({ valgtUddannelse, navigation, setFilter }) => {
  const [uddannelse, setUddannelse] = React.useState();
  const [selectedFilter, setSelectedFilter] = React.useState();

  const filters = [
    {
      label: "Højest ratede beretninger først",
      value: "ratingDsc",
    },
    {
      label: "Lavest ratede beretninger først",
      value: "ratingAsc",
    },
    {
      label: "Nyeste beretninger først",
      value: "datoDsc",
    },
    {
      label: "Ældste beretninger først",
      value: "datoAsc",
    },
    {
      label: "Kantine",
      value: "kantine",
    },
    // TODO: Find løsning med filtrering af kategorier - kun ÉT filter kan være valgt :(
    // @pvburleigh
    // {
    //   label: "Arbejdsbyrde",
    //   value: "arbejdsbyrde",
    // },
    // {
    //   label: "Studiejob",
    //   value: "studiejob",
    // },
    // {
    //   label: "Socialt",
    //   value: "socialt",
    // },
    // {
    //   label: "Faciliteter",
    //   value: "faciliteter",
    // },
  ];

  React.useEffect(() => {
    if (!uddannelse) {
      setUddannelse(valgtUddannelse);
    }
  }, [valgtUddannelse]);

  if (!uddannelse) {
    return <Text>Indlæser ...</Text>;
  }

  const categories = uddannelse.reports.map((report) => {
    return report.category;
  });

  const submit = async () => {
    setFilter(selectedFilter);
    await navigation.navigate("Oversigt");
  };

  const removeFilters = async () => {
    setFilter(null);
    await navigation.navigate("Oversigt");
  };

  return (
    <Card>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        Filtrér beretninger
      </Text>
      <Card.Divider />
      <RadioButtonRN
        data={filters}
        selectedBtn={(e) => setSelectedFilter(e.value)}
      />

      {/*<TextInput
                placeholder={'Titel'}
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={[styles.input, styles.normalInputHeight]}
            />
            <Card.Divider />
      {/*<RNPickerSelect
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
            />*/}
      {/* <Card.Divider /> */}
      {/* <TextInput
        value={description}
        placeholder={"Del din oplevelse"}
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={(text) => setDescription(text)}
        style={descriptionStyle}
        multiline={true}
      /> */}
      <Card.Divider />
      <View style={{ alignItems: "center" }}>
        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.text}>Filtrér</Text>
        </Pressable>
      </View>
      {selectedFilter && (
        <>
          <Card.Divider style={{ marginTop: 15 }} />
          <View style={{ alignItems: "center" }}>
            <Pressable style={styles.greyButton} onPress={removeFilters}>
              <Text style={styles.text}>Fjern filtre</Text>
            </Pressable>
          </View>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    paddingBottom: 5,
    textTransform: "uppercase",
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
    width: 150,
  },
  greyButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "grey",
    width: 150,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
  },
});

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 40,
    height: 50,
  },
  /*inputAndroid: {

    },*/
});

export default Filters;
