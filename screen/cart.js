import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    FlatList,
    Image,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
export default Cart = () => {
    const route = useRoute();
    const { cartData } = route.params;
    // const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ width: "100%", height: 500 }}>
                {/* List san pham */}
                <View style={styles.listProductsContainer}>
                    <FlatList
                        data={cartData}
                        renderItem={({ item }) => (
                            <View style={styles.product}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 100, height: 100 }}
                                />
                                <View style={styles.productBody}>
                                    <Text>{item.name}</Text>
                                    <Text>{item.price}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity>
                                            <Entypo
                                                name="circle-with-minus"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                        <Text>{item.quantity}</Text>
                                        <TouchableOpacity>
                                            <Entypo
                                                name="circle-with-plus"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <EvilIcons
                                        name="trash"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(product) => product.id}
                    />
                    {/* btn Thanh toan */}
                </View>
                {/* Tong tien */}
                <View>
                    <Text>Tong tien: {totalAmount}</Text>
                </View>
                <TouchableOpacity>
                    <Text>Thanh toan</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    listProductsContainer: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
    productBody: {},
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
