import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
export default Footer = () => {
    const [isSelected, setSelected] = useState("Home");
    return (
        <View style={styles.listFooter}>
            <TouchableOpacity
                style={[styles.footerItem]}
                onPress={() => setSelected("Home")}
            >
                <AntDesign
                    name="home"
                    size={24}
                    color={isSelected === "Home" ? "#0bd4fa" : "#000"}
                />
                <Text style={[isSelected === "Home" && styles.text]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.footerItem}
                onPress={() => setSelected("Search")}
            >
                <AntDesign
                    name="search1"
                    size={24}
                    color={isSelected === "Search" ? "#0bd4fa" : "#000"}
                />
                <Text style={[isSelected === "Search" && styles.text]}>
                    Search
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.footerItem}
                onPress={() => setSelected("Favorites")}
            >
                <FontAwesome
                    name="heartbeat"
                    size={24}
                    color={isSelected === "Favorites" ? "#0bd4fa" : "#000"}
                />
                <Text style={[isSelected === "Favorites" && styles.text]}>
                    Favorites
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.footerItem}
                onPress={() => setSelected("Inbox")}
            >
                <MaterialIcons
                    name="message"
                    size={24}
                    color={isSelected === "Inbox" ? "#0bd4fa" : "#000"}
                />
                <Text style={[isSelected === "Inbox" && styles.text]}>
                    Inbox
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.footerItem}
                onPress={() => setSelected("Account")}
            >
                <AntDesign
                    name="addusergroup"
                    size={24}
                    color={isSelected === "Account" ? "#0bd4fa" : "#000"}
                />
                <Text style={[isSelected === "Account" && styles.text]}>
                    Account
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    listFooter: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        paddingVertical: 15,
    },
    footerItem: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#0bd4fa",
    },
});
