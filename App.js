import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskButton from "./components/TaskButton";
import { supabase } from "./state/supabase";
import Auth from "./views/Auth";

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
            {session && session.user ? (
                <View style={styles.background}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>To Do App</Text>
                    </View>
                    <View style={styles.dayButtons}>
                        <Text style={[styles.button, styles.buttonActive]}>
                            today
                        </Text>
                        <Text style={styles.button}>tomorrow</Text>
                        <Text style={styles.button}>saturday</Text>
                    </View>
                    <View style={styles.tasks}>
                        <TaskButton />
                        <TaskButton />
                        <TaskButton />
                        <TaskButton />
                    </View>
                </View>
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
    background: {
        flex: 1,
        backgroundColor: "#141414",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: "#6f9ec4",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20.5,
    },
    dayButtons: {
        flexDirection: "row",
        marginLeft: 18,
        marginTop: 18,
    },
    button: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,
        color: "white",
        backgroundColor: "#181818",
        borderRadius: 12,
        margin: 5,
        textTransform: "uppercase",
    },
    buttonActive: {
        backgroundColor: "#78ACD5",
        color: "black",
    },
    tasks: {
        flex: 1,
    },
});
