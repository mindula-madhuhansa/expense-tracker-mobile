import { View, Text, Button } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

import services from "../utils/services";
import { client } from "../utils/KindeConfig";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    const loggedOut = await client.logout(true);
    if (loggedOut) {
      // User was logged out
      await services.storeData("login", "false");
      router.replace("/login");
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  // Check user authenticated or not
  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login");
    }
  };

  return (
    <View>
      <Text style={{ marginTop: 50 }} onPress={handleLogout}>
        Home
      </Text>
    </View>
  );
}
