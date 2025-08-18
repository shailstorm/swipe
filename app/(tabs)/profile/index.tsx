import { ThemedView } from "@/components/ThemedView";
import { useAuthSession } from "@/providers/AuthProvider";
import { Link } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

export default function ProfileScreen() {
  const { signOut, isLoading, session } = useAuthSession();

  return (
    <ThemedView>
      <Link href="/(tabs)/profile/newProject" push asChild>
        <Button>Create New Project</Button>
      </Link>
      <Button disabled={isLoading} onPress={() => signOut()}>
        Sign Out
      </Button>
    </ThemedView>
  );
}
