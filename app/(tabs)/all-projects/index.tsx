import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../../../lib/supabase";

export default function AllProjectsScreen() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        setError(error.message);
      } else {
        setProjects(data ?? []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View className="flex-1 justify-center bg-white">
      {projects.map((project) => (
        <Text key={project.id}>{project.title}</Text>
      ))}
    </View>
  );
}
