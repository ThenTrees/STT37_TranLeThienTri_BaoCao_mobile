import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    FlatList,
} from "react-native";
import React, { useState } from "react";
export default Cart = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ width: "100%", height: 500 }}>
                {/* List san pham */}
                <View style={styles.listProductsContainer}>
                    <FlatList
                        data={products}
                        renderItem={(item) => (
                            <View style={styles.productItem}>
                                {/* hinh */}
                                <Image source={{ uri: item.image }} />
                                <View>
                                    {/* ten */}
                                    <Text>{item.name}</Text>
                                    {/* gia */}
                                    <Text>{item.price}</Text>
                                    {/* - so luong +*/}
                                    <View>
                                        <TouchableOpacity>
                                            <Text>-</Text>
                                        </TouchableOpacity>
                                        <Text>{item.quantity}</Text>
                                        <TouchableOpacity>
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>{/* btn xoa khoi gio hang */}</View>
                            </View>
                        )}
                        keyExtractor={(product) => product.id}
                    ></FlatList>
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
});
