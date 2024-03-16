import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ColorPicker from "../components/ColorPicker";

import Colors from "../utils/Colors";
import { supabase } from "../utils/supabase";
import { client } from "../utils/kinde";

export default function CategoryModal() {
  const router = useRouter();

  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  const [categoryName, setCategoryName] = useState();
  const [totalBudget, setTotalBudget] = useState();

  const OnCreateCategory = async () => {
    const user = await client.getUserDetails();

    const { data, error } = await supabase
      .from("categories")
      .insert([
        {
          name: categoryName,
          assigned_budget: totalBudget,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();

    if (data) {
      ToastAndroid.show("Category created!", ToastAndroid.SHORT);
      router.replace({
        pathname: "/category-detail",
        params: {
          categoryId: data[0].id,
        },
      });
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>

      {/* Add Category name and Total Budget section */}
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Category name"
          style={{ width: "100%", fontSize: 16 }}
          onChangeText={(value) => setCategoryName(value)}
        />
      </View>

      <View style={styles.inputView}>
        <MaterialIcons name="attach-money" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Total budget"
          style={{ width: "100%", fontSize: 16 }}
          keyboardType="numeric"
          onChangeText={(value) => setTotalBudget(value)}
        />
      </View>

      <TouchableOpacity
        onPress={() => OnCreateCategory()}
        disabled={!categoryName || !totalBudget}
        style={styles.button}
      >
        <Text
          style={{ textAlign: "center", fontSize: 16, color: Colors.WHITE }}
        >
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE,
  },
  inputView: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    padding: 14,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
});
