import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function ProjectRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <ThemedView>
      <ThemedText>{title}</ThemedText>
      <ThemedText>description: {description}</ThemedText>
    </ThemedView>
  );
}
