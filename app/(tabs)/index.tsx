import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-300">
      <Text className="text-2xl text-primary">Edit app/index.tsx to edit this screen.</Text>
      <Text>This is my movie application using expo router</Text>
    </View>
  );
}
