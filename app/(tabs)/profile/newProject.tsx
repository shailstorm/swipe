import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createProject } from "@/data/mutations";
import { useAuthSession } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { session } = useAuthSession();
  const user_id = session?.user.id;

  const mutation = useMutation({
    mutationFn: () => createProject({ title, description, user_id }),
  });

  const handleSubmit = async () => {
    if (!session?.user) throw new Error("No user on the session!");

    mutation.mutate();
  };

  return (
    <ThemedView className="flex flex-col">
      <ThemedText>Project Title</ThemedText>
      <TextInput onChangeText={setTitle} value={title} />
      <ThemedText>Description</ThemedText>
      <TextInput onChangeText={setDescription} value={description} />
      <Button title="Submit" onPress={handleSubmit} />
      {mutation.isPending ? <ThemedText>Adding...</ThemedText> : null}
      {mutation.isSuccess ? <ThemedText>Project Created!</ThemedText> : null}
      {mutation.isError ? (
        <ThemedText>`error: ${mutation.error.message}`</ThemedText>
      ) : null}
    </ThemedView>
  );
}
