import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type TabIconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  focused: boolean;
  color: string;
  size: number;
};

const TabIcon = ({ icon, focused, color, size, title }: TabIconProps) => {
  return (
    <View
      style={[
        styles.iconContainer, // Static style from StyleSheet
        {
          backgroundColor: focused ? "#007AFF" : "transparent", // Background động
          ...(focused && styles.shadow), // Shadow động khi focused
        },
      ]}
      className="flex-row flex-1 min-w-[112px] min-h-16 mt-4 items-center justify-center rounded-full overflow-hidden"
    >
      <Ionicons
        name={
          focused
            ? icon
            : (`${icon}-outline` as keyof typeof Ionicons.glyphMap)
        }
        size={size}
        color={focused ? "#fff" : color}
        className=""
      />
      {
        focused && (
          <Text
            style={{ color: focused ? "#fff" : color }}
            className="text-secondary text-base font-semibold ml-2"
          >
            {title}
          </Text>
        )
      }
    </View>
  );
};

const _Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          },
          tabBarStyle: {
            backgroundColor: "#0f0D23",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0f0D23"
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon="home"
                focused={focused}
                color={color}
                size={size}
                title="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon="search"
                focused={focused}
                color={color}
                size={size}
                title="Search"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon="save"
                focused={focused}
                color={color}
                size={size}
                title="Saved"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon="person"
                focused={focused}
                color={color}
                size={size}
                title="Profile"
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 36, // Kích thước container
    height: 36,
    borderRadius: 50, // Hình tròn
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Cho Android
  },
});

export default _Layout;
