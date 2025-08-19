import { ProjectRow } from "@/components/ProjectRow";
import { ThemedText } from "@/components/ThemedText";
import { getAllProjects } from "@/data/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";

export default function AllProjectsScreen() {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allProjects"],
    queryFn: getAllProjects,
  });

  if (isPending) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <View className="flex-1 justify-center bg-white">
      <ThemedText>total projects: {data.length}</ThemedText>
      {data.map((project) => (
        <ProjectRow
          key={project.id}
          title={project.title}
          description={project.description}
        ></ProjectRow>
      ))}
    </View>
  );
}
