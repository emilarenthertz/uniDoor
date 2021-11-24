import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import * as Haptics from "expo-haptics";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";

const RatingComponnet = ({ report }) => {
  const [rating, setRating] = React.useState(report.rating);

  return (
    <View style={{ flex: 1, marginBottom: 18 }}>
      <TouchableOpacity
        disabled={rating == Number(report.rating) + 1}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setRating(Number(rating) + 1);
        }}
      >
        <Icon
          name="chevron-up"
          size={25}
          color={rating == Number(report.rating) + 1 ? "grey" : "black"}
        />
      </TouchableOpacity>
      <Text style={{ marginLeft: 4, marginTop: 3 }}>{rating}</Text>
      <TouchableOpacity
        disabled={rating == Number(report.rating) - 1}
        onPress={() => {
          Haptics.impactAsync(Haptics.NotificationFeedbackType.Light);
          setRating(Number(rating) - 1);
        }}
      >
        <Icon
          name="chevron-down"
          size={25}
          color={rating == Number(report.rating) - 1 ? "grey" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

const ReportList = ({ query }) => {
  const [uddannelse, setUddannelse] = React.useState();

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
    return <Text>Indlæser beretninger...</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {uddannelse.reports.map((report) => {
        const dato = new Date(Number(report.date));
        return (
          <Card key={report.date}>
            <Card.Title>{report.title}</Card.Title>
            <Card.Divider />
            <View style={{ flexDirection: "row" }}>
              <RatingComponnet report={report} />
              <Text style={{ flex: 7, marginBottom: 18 }}>
                {report.description}
              </Text>
            </View>
            <Card.Divider />
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ flex: 1, color: "#5b5b5b", fontSize: 12 }}
              >{`#${report.category}`}</Text>
              <Text
                style={{ textAlign: "right", color: "#5b5b5b", fontSize: 12 }}
              >
                {dato.toLocaleDateString("da-DK", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
          </Card>
        );
      })}
      <Text style={{ marginBottom: 120 }} />
      {/* Above is a hack - find better solution */}
    </ScrollView>
  );
};

export default ReportList;
