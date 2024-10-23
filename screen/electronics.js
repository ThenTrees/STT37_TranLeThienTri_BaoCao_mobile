import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    StatusBar,
    Modal,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import Footer from "./footer";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
export default Electronics = ({ navigation }) => {
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productDetail, setProductDetail] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [menuItemSelected, setMenuItemSelected] = useState("Best Sales");
    const [textMenuItemSelected, setTextMenuItemSelected] =
        useState("Best Sales");
    const [showAllProduct, setShowAllProduct] = useState(false);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [text, setText] = useState("");
    const [cart, setCart] = useState([]);
    const filterProduct = (categoryId, menuItemSelected) => {
        setSelectedCategoryId(categoryId);
        const listProductFiltered = products.filter(
            (item) => item.id === categoryId && item.status === menuItemSelected
        );
        setFilteredProduct(listProductFiltered);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get(
                    "https://671168cf4eca2acdb5f4c2fe.mockapi.io/categoriesOfElectronic"
                );
                const productsResponse = await axios.get(
                    "https://671168cf4eca2acdb5f4c2fe.mockapi.io/productsOfElectronics"
                );
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
                setFilteredProduct(productsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategoryId) {
            const category = categories.find(
                (item) => item.id === selectedCategoryId
            );
            if (category) {
                const filtered = products.filter(
                    (product) =>
                        product.name === category.name &&
                        product.status === menuItemSelected
                );
                setFilteredProduct(filtered);
            }
        }
    });

    const searchByName = (text) => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProduct(filtered);
    };

    const addToCart = (product) => {
        const newCart = [...cart];
        const index = newCart.findIndex((item) => item.id === product.id);
        if (index === -1) {
            newCart.push({ ...product, quantity: 1 });
        } else {
            newCart[index].quantity++;
        }
        setCart(newCart);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={{ width: "100%", height: 550 }}>
                <View styles={styles.container}>
                    {/* header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                                alert("Back");
                            }}
                        >
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Electronics</Text>
                        <TouchableOpacity
                            style={styles.cartBtn}
                            onPress={() => {
                                // addToCart(productDetail);
                                navigation.navigate("Cart", cart);
                            }}
                        >
                            <AntDesign
                                name="shoppingcart"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                        <Image
                            style={styles.imgAvt}
                            source={require("../assets/img/ava1.png")}
                        />
                    </View>
                    {/* body */}
                    <View style={styles.search}>
                        {/* search input */}
                        <View style={styles.searchInput}>
                            {/* icon search */}
                            <TouchableOpacity>
                                <Feather
                                    style={styles.btnSearch}
                                    name="search"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor={"#bbb"}
                                style={styles.input}
                                value={text}
                                onChangeText={(text) => {
                                    setText(text);
                                    searchByName(text);
                                }}
                            />
                            {/* dropdown */}
                        </View>
                        {/* dropdown */}
                        <TouchableOpacity style={styles.dropdown}>
                            <FontAwesome5
                                name="sort-amount-down"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    {/* category */}
                    <View style={styles.category}>
                        <Text style={styles.textCategory}>Categories</Text>
                        <TouchableOpacity style={styles.seeAll}>
                            <Text style={{ color: "#bbb" }}>See all</Text>
                            <Fontisto
                                name="caret-right"
                                size={16}
                                color="#bbb"
                            />
                        </TouchableOpacity>
                    </View>
                    {/* List categories */}
                    <View style={styles.categoryList}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() =>
                                    filterProduct(category.id, menuItemSelected)
                                }
                                style={[
                                    styles.categoryContainer,
                                    category.id === "1" && {
                                        backgroundColor: "#D8BFD8",
                                    },
                                    category.id === "2" && {
                                        backgroundColor: "#ADD8E6",
                                    },
                                    category.id === "3" && {
                                        backgroundColor: "#FFE4B5",
                                    },
                                    {
                                        borderColor:
                                            selectedCategoryId === category.id
                                                ? category.id === "1"
                                                    ? "#c478f0"
                                                    : category.id === "2"
                                                    ? "#81a7de"
                                                    : "#fccd7c"
                                                : "transparent",
                                    },
                                ]}
                            >
                                <Image
                                    source={{ uri: category.icon }}
                                    style={styles.categoryIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* menu */}
                    <View style={styles.menuContainer}>
                        {["Best Sales", "Best Matched", "Popular"].map(
                            (item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={[
                                        styles.menuItem,
                                        item === menuItemSelected &&
                                            styles.menuItemSelected,
                                    ]}
                                    onPress={() => {
                                        setMenuItemSelected(item);
                                        setTextMenuItemSelected(item);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.textMenuItem,
                                            textMenuItemSelected === item &&
                                                styles.textMenuItemIsSelected,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                    </View>
                    {/* list item */}
                    <FlatList
                        data={
                            showAllProduct
                                ? filteredProduct
                                : filteredProduct.slice(0, 5)
                        }
                        renderItem={({ item }) => (
                            // product Item
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    setProductDetail(item);
                                    setModalVisible(true);
                                }}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    resizeMode="contain"
                                />
                                {/* name and rate */}
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {item.name}
                                    </Text>
                                    <Text>{item.rating}</Text>
                                </View>
                                <TouchableOpacity style={styles.addToCartBtn}>
                                    {/* add to cart */}
                                    <FontAwesome
                                        name="plus-circle"
                                        size={24}
                                        color="black"
                                    />
                                    <Text>{item.price}</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    {/* btn see all*/}
                    <TouchableOpacity
                        style={styles.btnSeeAll}
                        onPress={() => setShowAllProduct(!showAllProduct)}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "#fff",
                            }}
                        >
                            {showAllProduct ? "See less" : "See all"}
                        </Text>
                    </TouchableOpacity>
                    {/* banner */}
                    <View>
                        <Image
                            style={{ width: "100%", height: 200 }}
                            source={require("../assets/Data/banner.png")}
                            resizeMode="contain"
                        />
                    </View>
                    {/* etc */}
                </View>
            </ScrollView>
            {/* Footer */}
            <View style={styles.line}></View>
            <Footer />
            {/* <Footer /> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainerFull}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{
                            padding: 10,
                            position: "absolute",
                            top: 160,
                            right: 20,
                            borderRadius: 10,
                            borderColor: "red",
                            borderWidth: 2,
                        }}
                    >
                        <AntDesign name="close" size={20} color="red" />
                    </TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <View style={styles.productDetail}>
                            <Image
                                source={{ uri: productDetail.image }}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                                resizeMode="contain"
                            />
                            <View>
                                <Text
                                    style={{ fontSize: 24, fontWeight: "bold" }}
                                >
                                    {productDetail.name}
                                </Text>
                                <Text
                                    style={{ fontSize: 24, fontWeight: "bold" }}
                                >
                                    {productDetail.price}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontStyle: "italic",
                                    }}
                                >
                                    {productDetail.description}
                                </Text>
                                <Text
                                    style={{ fontSize: 16, fontWeight: "bold" }}
                                >
                                    Rating: {productDetail.rating}
                                </Text>
                                <Text
                                    style={{ fontSize: 16, fontWeight: "bold" }}
                                >
                                    Status: {productDetail.status}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.btnAddToCartModal}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "#fff",
                                }}
                            >
                                Add To Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 10,
    },
    container: {},
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    imgAvt: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 150,
        marginLeft: 10,
    },
    cartBtn: {
        marginLeft: 20,
        padding: 10,
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        gap: 20,
    },
    btnSearch: {
        padding: 10,
    },
    searchInput: {
        borderRadius: 10,
        backgroundColor: "#EEEEEE",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    input: {
        outlineWidth: 0,
    },
    dropdown: {
        backgroundColor: "#EEEEEE",
        padding: 10,
        borderRadius: 10,
    },
    category: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    textCategory: {
        fontSize: 16,
        fontWeight: "bold",
    },
    seeAll: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    categoryList: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    categoryContainer: {
        alignItems: "center",
        width: 105,
        height: 92,
        borderRadius: 10,
        justifyContent: "center",
        borderWidth: 2,
    },
    categoryIcon: {
        width: 76,
        height: 68,
    },
    menuContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    menuItem: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#eee",
    },
    menuItemSelected: {
        backgroundColor: "#CCFFFF",
    },
    textMenuItem: {
        fontSize: 16,
        color: "#000",
    },
    textMenuItemIsSelected: {
        fontWeight: "bold",
        color: "#00FFFF",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        borderRadius: 5,
    },
    addToCartBtn: {
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    btnSeeAll: {
        backgroundColor: "#0bd4fa",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
    },
    line: {
        height: 1,
        backgroundColor: "#E0E0E0",
    },
    productDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 40,
        alignItems: "center",
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
        width: "90%",
        alignItems: "center",
        position: "relative",
    },
    btnAddToCartModal: {
        backgroundColor: "#0bd4fa",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
        padding: 10,
    },
});
