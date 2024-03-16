import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

import Colors from "../utils/Colors";

const placeholder =
  "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg";

export default function CategoryItemModal() {
  const [image, setImage] = useState(placeholder);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => onImagePick()}>
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.textInputContainer}>
        <Ionicons name="pricetag" size={24} color={Colors.GRAY} />
        <TextInput placeholder="Item Name" style={styles.input} />
      </View>

      <View style={styles.textInputContainer}>
        <Ionicons name="logo-usd" size={24} color={Colors.GRAY} />
        <TextInput placeholder="Cost" style={styles.input} />
      </View>

      <View style={styles.textInputContainer}>
        <Ionicons name="link" size={24} color={Colors.GRAY} />
        <TextInput placeholder="URL" style={styles.input} />
      </View>

      <View style={styles.textInputContainer}>
        <Ionicons name="pencil" size={24} color={Colors.GRAY} />
        <TextInput placeholder="Note" style={styles.input} numberOfLines={4} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: Colors.WHITE,
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    backgroundColor: Colors.GRAY,
    borderRadius: 15,
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.GRAY,
    marginTop: 10,
  },
  input: {
    fontSize: 17,
  },
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 25,
  },
});
