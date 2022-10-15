import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../state/supabase";

export default function Auth() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signIn({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.header}>Auth</Text>
            <TextInput
                style={styles.loginField}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.loginField}
                value={password}
                onChangeText={setPassword}
            />
            <Text>{email}</Text>

            <TouchableOpacity
                style={[styles.button, styles.buttonActive]}
                onPress={() => signUpWithEmail()}
            >
                <Text> Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    signInWithEmail();
                }}
            >
                <Text style={styles.whiteText}> Login </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        color: "white",
        fontSize: 30,
    },

    loginContainer: {
        flex: 1,
        backgroundColor: "#141414",
        alignItems: "center",
    },
    loginField: {
        width: "90%",
        backgroundColor: "#181818",
        fontSize: 14,
        margin: 5,
        padding: 5,
        color: "white",
    },
    button: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#181818",
        borderRadius: 12,
        margin: 5,
        textTransform: "uppercase",
    },
    whiteText: {
        color: "white",
    },
    buttonActive: {
        backgroundColor: "#78ACD5",
        color: "black",
    },
});
