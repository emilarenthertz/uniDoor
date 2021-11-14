import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome";

const RatingComponnet = ({ report }) => {
  const [rating, setRating] = React.useState(report.rating);

  // TODO: look into how to fix below issue
  React.useEffect(() => {
    // skip initial render
    return () => {
      console.log("ny rating!!", rating);
      // TODO: Create and call Update rating query
    };
  }, [rating]);

  return (
    <View style={{ flex: 1, marginBottom: 15 }}>
      <TouchableOpacity
        disabled={rating == Number(report.rating) + 1}
        onPress={() => setRating(Number(rating) + 1)}
      >
        <Icon name="chevron-up" size={25} />
      </TouchableOpacity>
      <Text style={{ marginLeft: 4, marginTop: 3 }}>{rating}</Text>
      <TouchableOpacity
        disabled={rating == Number(report.rating) - 1}
        onPress={() => setRating(Number(rating) - 1)}
      >
        <Icon name="chevron-down" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const ReportList = ({ query }) => {
  const [uddannelse, setUddannelse] = React.useState();

  query = "/universiteter/0/uddannelser/1"; // update dynamically from props

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

  uddannelse.reports.map((r) => console.log(r));
  return (
    <ScrollView>
      {uddannelse.reports.map((report) => {
        const dato = new Date(Number(report.date));
        return (
          <Card key={report.date}>
            <Card.Title>{report.title}</Card.Title>
            <Card.Divider />
            <View style={{ flexDirection: "row" }}>
              <RatingComponnet report={report} />
              <Text style={{ flex: 7 }}>{report.description}</Text>
            </View>
            <Card.Divider />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1 }}>{`#${report.category}`}</Text>
              <Text style={{ textAlign: "right" }}>
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
    </ScrollView>
  );
};

export default ReportList;
