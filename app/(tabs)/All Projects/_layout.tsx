import { Stack } from "expo-router";

export default function AllProjectsLayout() {
    return (
        <Stack >
            <Stack.Screen 
                name="index"
                options={{ 
                    title: "All Projects", 
                    headerTitleStyle: {
                        fontWeight: "normal",
                        fontSize: 25,
                        fontFamily: "sans-serif",
                    },
                    headerTransparent: true, 
                }}
            />
        </Stack>
    )
}