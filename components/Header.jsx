import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { client } from "../utils/kinde";
import Colors from "../utils/Colors";

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: user?.picture }} style={styles.profileImage} />
      <View style={styles.container}>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>{user?.given_name}</Text>
        </View>
        <FontAwesome name="bell" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  profileImage: { width: 50, height: 50, borderRadius: 99 },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
  },
  welcomeText: { color: Colors.WHITE, fontSize: 16, fontFamily: "montserrat" },
  nameText: { color: Colors.WHITE, fontSize: 20, fontFamily: "montserratBold" },
});
