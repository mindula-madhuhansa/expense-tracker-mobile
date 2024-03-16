import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

import Colors from "../../utils/Colors";

export default function CategoryInfo({ categoryDetail }) {
  const [totalCost, setTotalCost] = useState();
  const [percentageTotal, setPercentageTotal] = useState();

  useEffect(() => {
    categoryDetail && calculateTotalPercentage();
  }, [categoryDetail]);

  const calculateTotalPercentage = () => {
    let total = 0;
    categoryDetail?.category_items?.forEach((item) => {
      total = total + item.cost;
    });
    setTotalCost(total);

    const percentage = (total / categoryDetail.assigned_budget) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    setPercentageTotal(percentage);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text
            style={[styles.textIcon, { backgroundColor: categoryDetail.color }]}
          >
            {categoryDetail.icon}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.categoryName}>{categoryDetail?.name}</Text>
          <Text style={styles.categoryItemText}>
            {categoryDetail?.category_items?.length} items
          </Text>
        </View>
        <Ionicons name="trash" size={24} color="red" />
      </View>

      {/* Progress Bar */}
      <View style={styles.amountContainer}>
        <Text>$ {totalCost}</Text>
        <Text>Total budget: $ {categoryDetail.assigned_budget}</Text>
      </View>

      <View style={styles.progressBarMainContainer}>
        <View style={[styles.progressBarSubContainer, { width: `40%` }]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIcon: {
    fontSize: 25,
    padding: 20,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  categoryName: {
    fontWeight: "bold",
    fontSize: 24,
  },
  categoryItemText: {
    fontSize: 16,
  },
  amountContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  progressBarMainContainer: {
    width: "100%",
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    marginTop: 7,
  },
  progressBarSubContainer: {
    width: "40%",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    height: 15,
  },
});
