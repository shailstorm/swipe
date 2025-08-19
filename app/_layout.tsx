import AuthProvider from "@/providers/AuthProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform, useColorScheme } from "react-native";
import "react-native-reanimated";

// react-query auto refetch on reconnect for react native
// idk if this works properly, but i would expect results to refresh if there are new results and you've come back from lost connectivity
// https://tanstack.com/query/v5/docs/framework/react/react-native#online-status-management
onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });
  return eventSubscription.remove;
});

export default function RootLayout() {
  // create a single QueryClient instance
  const [queryClient] = useState(() => new QueryClient());

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // react-query refetch on app focus
  // i would expect results to auto refresh if there are new results when you go back to the app
  // https://tanstack.com/query/v5/docs/framework/react/react-native#refetch-on-app-focus
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
