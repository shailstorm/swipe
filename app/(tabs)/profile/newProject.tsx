import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { supabase } from "@/lib/supabase";
import { useAuthSession } from "@/providers/AuthProvider";
import React, { useState } from "react";
import { Alert, Button, TextInput } from "react-native";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { session } = useAuthSession();

  const handleSubmit = async () => {
    if (!session?.user) throw new Error("No user on the session!");

    const { error } = await supabase.from("projects").insert({
      title: title,
      description: description,
      user_id: session?.user.id,
    });
    if (error) {
      Alert.alert(`error: ${error.message}`);
    } else {
      Alert.alert("Form Submitted!");
    }
  };

  return (
    <ThemedView className="flex flex-col">
      <ThemedText>Project Title</ThemedText>
      <TextInput onChangeText={setTitle} value={title} />
      <ThemedText>Description</ThemedText>
      <TextInput onChangeText={setDescription} value={description} />
      <Button title="Submit" onPress={handleSubmit} />
    </ThemedView>
  );
}
