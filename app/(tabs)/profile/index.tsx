import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

export default function ProfileScreen() {
  return (
    <ThemedView>
      <Link href="/(tabs)/profile/newProject" push asChild>
        <Button>Create New Project</Button>
      </Link>
    </ThemedView>
  );
}
