import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../state/supabase";

export default function TaskView({ route }) {
    let task = route.params.task;
    const navigation = useNavigation();

    async function completeTask() {
        let { error } = await supabase
            .from("todo_items")
            .update({ completed_at: new Date() })
            .match({ id: task.id });

        if (error) {
            console.error(error);
            return;
        }

        navigation.goBack();
    }

    async function deleteTask() {
        let { error } = await supabase
            .from("todo_items")
            .delete()
            .eq("id", task.id);

        if (error) {
            console.error(error);
            return;
        }

        navigation.goBack();
    }

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Task View</Text>
            </View>

            <View style={styles.values}>
                <View style={styles.value}>
                    <Text style={[styles.key, styles.white]}>Description</Text>
                    <Text style={styles.white}>{task.description}</Text>
                </View>
                <View style={styles.value}>
                    <Text style={[styles.key, styles.white]}>Created</Text>
                    <Text style={styles.white}>{task.created_at}</Text>
                </View>
                <View style={styles.value}>
                    <Text style={[styles.key, styles.white]}>Status</Text>
                    <Text style={styles.white}>
                        {task.completed_at ? "Finished" : "To do"}
                    </Text>
                </View>

                {task.completed_at && (
                    <View style={styles.value}>
                        <Text style={[styles.key, styles.white]}>
                            Completed at
                        </Text>
                        <Text style={styles.white}>{task.completed_at}</Text>
                    </View>
                )}

                {task.due_date && (
                    <View style={styles.value}>
                        <Text style={[styles.key, styles.white]}>Due</Text>
                        <Text style={styles.white}>{task.due_date}</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity onPress={deleteTask}>
                <View style={[styles.button, styles.buttonActive]}>
                    <Text>Delete</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={completeTask}>
                <View style={[styles.button, styles.buttonActive]}>
                    <Text>Complete</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    values: {
        margin: 12,
    },
    value: {
        padding: 12,
        justifyContent: "space-between",
        width: "100%",
        margin: 5,
        backgroundColor: "#181818",
        borderRadius: 12,
        flexDirection: "row",
    },
    white: {
        color: "white",
    },
    key: {
        fontSize: 16,
        fontWeight: "bold",
    },
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
