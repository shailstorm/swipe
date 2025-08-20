import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createProject } from "@/data/mutations";
import { useAuthSession } from "@/providers/AuthProvider";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";

export default function NewProject() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expireDate, setExpireDate] = useState(new Date());

  const { session } = useAuthSession();
  const userId = session?.user?.id;

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    if (currentDate) setExpireDate(currentDate);
  };

  const mutation = useMutation({
    mutationFn: () => createProject({ title, description, userId, expireDate }),
    onSuccess: () => {
      // refresh query results to include this newly created project when we reroute back to profile tab
      queryClient.invalidateQueries({
        queryKey: ["myProjects", userId],
      });
      router.replace("/(tabs)/profile");
    },
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
      <ThemedText>Expires At</ThemedText>
      <DateTimePicker
        testID="dateTimePicker"
        value={expireDate}
        is24Hour={true}
        onChange={onChange}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {mutation.isPending && <ThemedText>Adding...</ThemedText>}
      {mutation.isError && (
        <ThemedText>Error: {mutation.error.message}</ThemedText>
      )}
    </ThemedView>
  );
}
