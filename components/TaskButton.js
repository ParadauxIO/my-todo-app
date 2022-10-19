import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TaskButton({ task }) {
    const navigation = useNavigation();

    let energyRequired = 3;
    let energyRequiredComps = [];

    for (let i = 0; i < energyRequired; i++) {
        energyRequiredComps.push(<View style={styles.energyIndicator} />);
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("TaskView", { task })}
        >
            <View style={styles.taskGenre} />
            <Text style={styles.taskDescription}>{task.description}</Text>
            <View style={styles.energyIndicators}>{energyRequiredComps}</View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#181818",
        borderRadius: 12,
        margin: 12,
        padding: 12,
        alignItems: "center",
    },
    taskDescription: {
        marginLeft: 10,
        color: "white",
        fontSize: 16,
    },
    taskGenre: {
        backgroundColor: "#f1235c",
        height: 20,
        width: 2,
    },
    energyIndicators: {
        marginLeft: "auto",
        flexDirection: "row",
        width: 70,
        justifyContent: "space-around",
    },
    energyIndicator: {
        backgroundColor: "#78acd5",
        width: 15,
        height: 15,
    },
});
