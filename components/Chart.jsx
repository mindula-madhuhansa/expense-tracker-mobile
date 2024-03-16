import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "../utils/Colors";

export default function Chart() {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        Total Estimate: <Text style={{ fontWeight: "bold" }}>$ 0</Text>
      </Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <FontAwesome name="circle" size={24} color={Colors.GRAY} />
          <Text>N/A</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  subContainer: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    gap: 40,
  },
});
