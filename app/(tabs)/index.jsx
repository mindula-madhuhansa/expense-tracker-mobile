import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Header from "../../components/Header";
import Chart from "../../components/Chart";

import services from "../../utils/services";
import { client } from "../../utils/kinde";
import { supabase } from "../../utils/supabase";
import Colors from "../../utils/Colors";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
    getCategoryList;
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
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("created_by", user.email);

    console.log("Data:", data);
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
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          height: 150,
        }}
      >
        <Header />
        <Chart />
      </View>

      <Link href={"/categoryModal"} style={styles.buttonContainer}>
        <FontAwesome name="plus-circle" size={54} color={Colors.PRIMARY} />
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
