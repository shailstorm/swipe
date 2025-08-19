import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getUserProjects } from "@/data/queries";
import { useAuthSession } from "@/providers/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

export default function ProfileScreen() {
  const { signOut, isLoading, session } = useAuthSession();
  const user_id = session?.user.id;

  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["myProjects", user_id],
    queryFn: () => getUserProjects(user_id),
    enabled: !!user_id,
  });

  const MyProjectsList = () => {
    if (isPending) return <ThemedText>Loading...</ThemedText>;
    if (isError) return <ThemedText>Error: {error.message}</ThemedText>;

    return <ThemedText>my project count: {data.length}</ThemedText>;
  };

  return (
    <ThemedView>
      <Link href="/(tabs)/profile/newProject" push asChild>
        <Button>Create New Project</Button>
      </Link>
      <MyProjectsList />
      <Button disabled={isLoading} onPress={() => signOut()}>
        Sign Out
      </Button>
    </ThemedView>
  );
}
