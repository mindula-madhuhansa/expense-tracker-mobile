import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="category-modal"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add new Category",
        }}
      />
      <Stack.Screen
        name="category-item-modal"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add new Item",
        }}
      />
    </Stack>
  );
}
