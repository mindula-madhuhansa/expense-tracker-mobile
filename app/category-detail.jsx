import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import CategoryInfo from "../components/CategoryDetail/CategoryInfo";

import { supabase } from "../utils/supabase";
import CategoryItem from "../components/CategoryDetail/CategoryItem";
import Colors from "../utils/Colors";

export default function CategoryDetail() {
  const router = useRouter();

  const { categoryId } = useLocalSearchParams();

  const [categoryDetail, setCategoryDetail] = useState([]);

  useEffect(() => {
    categoryId && getCategoryDetail();
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*, category_items(*)")
      .eq("id", categoryId);

    setCategoryDetail(data[0]);
  };

  return (
    <View style={{ padding: 20, marginTop: 20, flex: 1 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
      <CategoryInfo categoryDetail={categoryDetail} />
      <CategoryItem categoryDetail={categoryDetail} />

      <Link
        href={{
          pathname: "/category-item-modal",
          params: {
            categoryId: categoryDetail.id,
          },
        }}
        style={styles.floatingBtn}
      >
        <Ionicons name="add-circle" size={60} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
