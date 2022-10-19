import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "./state/supabase";
import Auth from "./views/Auth";
import Home from "./views/Home";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskView from "./views/TaskView";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
    const [session, setSession] = useState({});

    async function load() {
        let { data, error } = await supabase.auth.getSession();
        console.log(error);
        setSession(data);

        supabase.auth.onAuthStateChange((_event, session) => {
            console.log(_event);
            setSession(session);
        });
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            {session && session.user ? (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="TaskView" component={TaskView} />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <Auth />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
