import { useAuthSession } from "@/providers/AuthProvider";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { session, isLoading } = useAuthSession();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        router.replace("/(tabs)/feed");
      } else {
        router.replace("/Auth");
      }
    }
  }, [isLoading, session]);

  return null;
}
