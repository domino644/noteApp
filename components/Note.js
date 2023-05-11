import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Note(props) {
    const deleteItem = async (key) => {
        await SecureStore.deleteItemAsync(key);
    };
    const alert = () => {
        Alert.alert("Czy chcesz usunąć?", [
            { text: "nie", style: "cancel" },
            {
                text: "tak",
                onPress: () => {
                    deleteItem(props.id.toString());
                    props.fun();
                },
            },
        ]);
    };
    return (
        <TouchableOpacity
            style={{
                width: "100%",
                height: "auto",
                backgroundColor: props.color,
                margin: 10,
            }}
            onLongPress={alert}
        >
            <View style={{ marginRight: 5 }}>
                <Text style={(styles.text, { textAlign: "right" })}>
                    {new Date(props.date).toLocaleDateString()}
                </Text>
            </View>
            <View>
                <Text style={(styles.text, { textAlign: "center" })}>
                    {props.header}
                </Text>
            </View>
            <View style={{ padding: 5 }}>
                <Text style={styles.text}>{props.content}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = new StyleSheet.create({
    text: {
        flex: 1,
        flexWrap: "wrap",
    },
});
