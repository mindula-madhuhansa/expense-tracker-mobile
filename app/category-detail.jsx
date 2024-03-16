import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import CategoryInfo from "../components/CategoryDetail/CategoryInfo";

import { supabase } from "../utils/supabase";
import CategoryItem from "../components/CategoryDetail/CategoryItem";

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
    <View style={{ padding: 20, marginTop: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
      <CategoryInfo categoryDetail={categoryDetail} />
      <CategoryItem categoryDetail={categoryDetail} />
    </View>
  );
}
