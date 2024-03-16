import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Colors from "../../utils/Colors";

export default function CategoryItem({ categoryDetail }) {
  useEffect(() => {
    console.log(categoryDetail);
  }, [categoryDetail]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item list</Text>

      <View style={{ marginTop: 20 }}>
        {categoryDetail?.category_items?.length > 0 ? (
          categoryDetail?.category_items?.map((item, index) => (
            <>
              <View key={index} style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.url}>{item.url}</Text>
                </View>
                <Text style={styles.cost}>${item.cost}</Text>
              </View>

              {categoryDetail?.category_items.length - 1 != index && (
                <View
                  style={{
                    borderWidth: 0.5,
                    marginTop: 10,
                    borderColor: Colors.GRAY,
                  }}
                />
              )}
            </>
          ))
        ) : (
          <Text style={styles.noItem}>No Items Found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 20, fontWeight: "bold" },
  url: {
    color: Colors.GRAY,
  },
  cost: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  noItem: {
    fontWeight: "bold",
    fontSize: 25,
    color: Colors.GRAY,
  },
});
