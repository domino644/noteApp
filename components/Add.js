import React, { useState } from "react";
import { Button, KeyboardAvoidingView, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

const Add = (p) => {
    const [textInputTitle, setTextInputTitle] = useState("");
    const [textInputContent, setTextInputContent] = useState("");
    const getRandomColor = () => {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const saveItem = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    };
    const save = async () => {
        if (textInputContent.trim() == "" || textInputTitle.trim() == "") {
            alert("Proszę uzupełnić pola");
        } else {
            let d = new Date();
            let time = d.getTime();
            let obj = {
                title: textInputTitle,
                content: textInputContent,
                date: time,
                color: getRandomColor(),
            };
            saveItem(time.toString(), JSON.stringify(obj));
            let allKeys = JSON.parse(await SecureStore.getItemAsync("all"));
            let newList = [...allKeys, time];
            await SecureStore.setItemAsync("all", JSON.stringify(newList));
            setTextInputContent("");
            setTextInputTitle("");
        }
    };
    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: "black",
                padding: 10,
                justifyContent: "space-evenly",
            }}
        >
            <TextInput
                placeholder="Title"
                placeholderTextColor="white"
                style={{
                    borderColor: "white",
                    borderBottomWidth: 0.5,
                    fontSize: 30,
                    color: "white",
                }}
                autoCorrect={false}
                onChangeText={(value) => setTextInputTitle(value)}
                value={textInputTitle}
            />
            <TextInput
                autoCorrect={false}
                multiline={true}
                numberOfLines={5}
                placeholder="Content"
                placeholderTextColor="white"
                style={{
                    borderColor: "white",
                    borderWidth: 0.5,
                    textAlignVertical: "top",
                    fontSize: 20,
                    color: "white",
                }}
                onChangeText={(value) => setTextInputContent(value)}
                value={textInputContent}
            />
            <Button title="Add note" onPress={save} />
        </KeyboardAvoidingView>
    );
};

export default Add;
