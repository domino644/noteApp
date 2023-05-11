import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import Note from "./Note";

const Main = (props) => {
    const [notes, setNotes] = useState([]);

    const getItem = async (key) => {
        let result = await SecureStore.getItemAsync(key);
        return result;
    };
    const getAllItems = async () => {
        let result = await SecureStore.getItemAsync("all");
        let tab = [];
        for (const note of JSON.parse(result)) {
            let obj = await getItem(note.toString());
            tab.push(JSON.parse(obj));
        }
        console.log(JSON.parse(result));
        setNotes(tab);
    };
    useEffect(() => {
        async function fetchMyAPI() {
            props.navigation.addListener("focus", async () => {
                let result = await SecureStore.getItemAsync("all");
                if (result) {
                    getAllItems();
                } else {
                    await SecureStore.setItemAsync("all", JSON.stringify([]));
                    getAllItems();
                }
            });
            let result = await SecureStore.getItemAsync("all");
            if (result) {
                getAllItems();
            } else {
                await SecureStore.setItemAsync("all", JSON.stringify([]));
                getAllItems();
            }
        }
        fetchMyAPI();
    }, []);
    let list = notes.map((item) => {
        if (item != null) {
            return (
                <Note
                    color={item.color}
                    header={item.title}
                    content={item.content}
                    id={item.date}
                    date={item.date}
                    key={item.date}
                    fun={getAllItems}
                />
            );
        }
    });
    let leftCol = list.filter((_item, index) => index % 2 != 0);
    let rightCol = list.filter((_item, index) => index % 2 == 0);
    return (
        <>
            <ScrollView
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, padding: 10 }}>{leftCol}</View>
                <View style={{ flex: 1, padding: 10 }}>{rightCol}</View>
            </ScrollView>
        </>
    );
};

export default Main;
