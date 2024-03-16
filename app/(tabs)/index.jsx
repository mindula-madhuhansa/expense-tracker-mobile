import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import Header from "../../components/Header";
import Chart from "../../components/Chart";
import CategoryList from "../../components/CategoryList";

import services from "../../utils/services";
import { client } from "../../utils/kinde";
import { supabase } from "../../utils/supabase";
import Colors from "../../utils/Colors";

export default function Home() {
  const router = useRouter();

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  const handleLogout = async () => {
    const loggedOut = await client.logout(true);

    if (loggedOut) {
      await services.storeData("login", "false");
      router.replace("/login");
      // User was logged out
    }
  };

  const getCategoryList = async () => {
    setLoading(true);
    const user = await client.getUserDetails();

    const { data, error } = await supabase
      .from("categories")
      .select("*, category_items(*)")
      .eq("created_by", user.email);

    setCategoryList(data);
    data && setLoading(false);
  };

  // Check user authenticated or not
  const checkUserAuth = async () => {
    const result = await services.getData("login");

    if (result !== "true") {
      router.replace("/login");
    }
  };

  return (
    <View
      style={{
        marginTop: 20,
        flex: 1,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoryList()}
            refreshing={loading}
          />
        }
      >
        <View
          style={{
            padding: 20,
            backgroundColor: Colors.PRIMARY,
            height: 150,
          }}
        >
          <Header />
        </View>
        <View style={{ padding: 20, marginTop: -75 }}>
          <Chart />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>

      <Link href={"/category-modal"} style={styles.buttonContainer}>
        <Ionicons name="add-circle" size={60} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
