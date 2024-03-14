import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function HomeLayout() {
  const [fontsLoaded, fontError] = useFonts({
    montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    montserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    montserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="categoryModal"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add new Category",
        }}
      />
    </Stack>
  );
}
