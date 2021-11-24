import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Card } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import RadioButtonRN from "radio-buttons-react-native";

const Filters = ({ valgtUddannelse, navigation, setFilter }) => {
  const [uddannelse, setUddannelse] = React.useState();
  const [selectedFilter, setSelectedFilter] = React.useState();
  const [pickedCategory, setPickedCategory] = React.useState("initial");

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
      label: "Sorter efter kategori",
      value: "category",
    }
  ];

  React.useEffect(() => {
    if (!uddannelse) {
      setUddannelse(valgtUddannelse);
    }
  }, [valgtUddannelse]);

  if (!uddannelse) {
    return <Text>Indlæser ...</Text>;
  }

  const categories = uddannelse.reports.map((report, i) => {
    return {
      label: report.category,
      value: report.category,
    }
  });

  const submit = async () => {
    const filter = {
      filter: selectedFilter,
      value: selectedFilter === 'category' ? pickedCategory : selectedFilter
    }

    setFilter(filter);
    await navigation.navigate("Oversigt");
  };

  const removeFilters = async () => {
    setFilter(null);
    await navigation.navigate("Oversigt");
  };

  const radioButtonClick = (e) =>{
      setSelectedFilter(e.value)
  }

  const categoryPicked = (value) => {
      setPickedCategory(value)
  }

  return (
    <Card>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        Filtrér beretninger
      </Text>
      <Card.Divider />
      <RadioButtonRN
        data={filters}
        selectedBtn={radioButtonClick}
      />
      { selectedFilter === 'category' ?
        <RNPickerSelect
          style={customPickerStyles}
          onValueChange={categoryPicked}
          placeholderTextColor={"DD0000"}
          placeholder={{ label: "Vælg kategori", value: "initial" }}
          items={categories}
        />
        : null
      }

      {selectedFilter ?
          <>
            <Card.Divider />
            <View style={{ alignItems: "center" }}>
              <Pressable style={styles.button} onPress={submit} disabledInputStyle={{backgroundColor: '#000000 !important'}} disabled={selectedFilter === 'category' && pickedCategory === "initial"}>
                <Text style={styles.text}>Filtrér</Text>
              </Pressable>
            </View>

            <Card.Divider style={{ marginTop: 15 }} />
            <View style={{ alignItems: "center" }}>
              <Pressable style={styles.greyButton} onPress={removeFilters}>
                <Text style={styles.text}>Fjern filtre</Text>
              </Pressable>
            </View>
          </>
      : null}
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
    fontSize: 20,
    textAlign: 'center',
    height: 45,
  },
  /*inputAndroid: {

    },*/
});

export default Filters;
