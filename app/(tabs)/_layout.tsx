import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="all-projects"
        options={{
          title: "All Projects",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="liked-projects"
        options={{
          title: "Liked Projects",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
