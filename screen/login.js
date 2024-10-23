import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Modal,
} from "react-native";

export default Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const users = [
        { email: "thientri.trank17@gmail.com", password: "tri123" },
        { email: "user2@example.com", password: "tri123" },
        { email: "user3@example.com", password: "tri123" },
        { email: "user4@example.com", password: "tri123" },
        { email: "user5@example.com", password: "tri123" },
    ];
    const handleLogin = () => {
        if (!email || !password) {
            setErrorMsg("Please enter email and password");
            setModalVisible(true);
            return;
        }
        const user = users.find(
            (user) => user.email === email && user.password === password
        );
        if (user) {
            navigation.navigate("Electronics");
        } else {
            setErrorMsg("Email or password is incorrect");
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <Image source={require("../assets/Data/icon.png")} />
                <Text style={styles.title}>Hello Again!</Text>
                <Text style={styles.subTitle}>Log into your account</Text>
            </View>
            {/* body */}
            <View>
                <View style={[styles.inputContainer]}>
                    <Image
                        style={styles.icon}
                        source={require("../assets/Data/Vector.png")}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email address"
                        placeholderTextColor="#A0A3BD"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                    />
                </View>
                <View style={[styles.inputContainer]}>
                    <Image
                        style={styles.icon}
                        source={require("../assets/Data/lock.png")}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor={"#A0A3BD"}
                        secureTextEntry={isShowPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setIsShowPassword(!isShowPassword)}
                    >
                        <Image
                            style={styles.icon}
                            source={require("../assets/Data/eye.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textForgotPass}>Forgot password?</Text>
                </View>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.btnContinue}
                >
                    Continue
                </TouchableOpacity>
                <View style={styles.orContainer}>
                    <View style={styles.line}></View>
                    <Text
                        style={{
                            color: "#aaa",
                            fontWeight: "bold",
                            fontSize: 14,
                        }}
                    >
                        or
                    </Text>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.socialContainer}>
                    <Image source={require("../assets/Data/google.png")} />
                    <Image source={require("../assets/Data/face.png")} />
                    <Image source={require("../assets/Data/apple.png")} />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainerFull}>
                    <View style={styles.modalContainer}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "500",
                            }}
                        >
                            {errorMsg}
                        </Text>
                        <TouchableOpacity
                            style={styles.btnModal}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "#fff",
                                }}
                            >
                                Ok
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 14,
        color: "#A0A3BD",
    },
    inputContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: "#E0E0E0",
        marginBottom: 10,
        alignItems: "center",
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        outlineWidth: 0,
    },
    icon: {
        marginRight: 5,
        opacity: 0.5,
    },
    btnContinue: {
        backgroundColor: "#0bd4fa",
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontWeight: "bold",
    },
    textForgotPass: {
        color: "#0bd4fa",
        fontSize: 14,
        textAlign: "right",
        marginBottom: 20,
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        gap: 10,
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#E0E0E0",
    },
    socialContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        marginTop: 20,
    },
    modalContainerFull: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    btnModal: {
        backgroundColor: "#0bd4fa",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        borderRadius: 10,
        marginTop: 20,
    },
});
