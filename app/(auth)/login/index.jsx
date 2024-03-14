import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import loginBg from "../../../assets/images/loginbg.png";
import Colors from "../../../utils/Colors";
import { client } from "../../../utils/KindeConfig";
import services from "../../../utils/services";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image source={loginBg} style={styles.bgImage} />
      <View style={styles.container}>
        <Text style={styles.headerText}>Personal Expense Manager</Text>

        <Text style={styles.subText}>
          Simplify Your Spending, Maximize Your Savings
        </Text>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Login/Signup</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            color: Colors.GRAY,
            marginTop: 10,
          }}
        >
          * By login/signup you will agree to our terms & conditions.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: 200,
    height: 400,
    marginTop: 70,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: Colors.BLACK,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    height: "100%",
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.WHITE,
  },
  subText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    paddingHorizontal: 5,
    marginTop: 20,
    borderRadius: 99,
  },
  buttonText: { textAlign: "center", color: Colors.PRIMARY },
});
