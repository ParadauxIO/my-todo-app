import { useEffect, useState } from "react";
import {
    ScrollView,
    ScrollViewBase,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getTodoItems } from "../state/handlers/todoHandler";
import TaskButton from "../components/TaskButton.js";
import { supabase } from "../state/supabase";
import { useIsFocused } from "@react-navigation/native";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const isFocused = useIsFocused();

    async function load() {
        setTasks(await getTodoItems());
    }

    let addItem = async () => {
        let { data } = await supabase.auth.getUser();

        let { error } = await supabase
            .from("todo_items")
            .insert({ description: "ANOTHER TASK!!", owner: data.user.id });

        if (!error) {
            setTasks(await getTodoItems());
        }

        if (error) console.error(error);
    };

    useEffect(() => {
        if (isFocused) {
            load();
        }
    }, [isFocused]);

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.headerText}>To Do App</Text>
            </View>
            <View style={styles.dayButtons}>
                <Text style={[styles.button, styles.buttonActive]}>today</Text>
                <Text style={styles.button}>tomorrow</Text>
                <Text style={styles.button}>saturday</Text>
            </View>
            <ScrollView style={styles.tasks}>
                {tasks.map((task) => {
                    if (task.completed_at) {
                        return;
                    }

                    return <TaskButton key={task.id} task={task} />;
                })}
            </ScrollView>

            <TouchableOpacity onPress={addItem}>
                <View style={[styles.button, styles.buttonActive]}>
                    <Text>Add</Text>
                </View>
            </TouchableOpacity>
        </View>
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
