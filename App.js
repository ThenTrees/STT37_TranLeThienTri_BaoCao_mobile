import Login from "./screen/login.js";
import Cart from "./screen/cart.js";
import Electronics from "./screen/electronics.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Electronics">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }} // Ẩn tiêu đề cho màn hình Login
                />
                <Stack.Screen
                    name="Electronics"
                    component={Electronics}
                    options={{
                        headerTitle: "",
                        headerBackTitleVisible: false,
                        headerStyle: {
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 0,
                        },
                        header: () => null,
                    }}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        headerTitle: "Cart",
                        headerBackTitleVisible: false,
                        headerStyle: {
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 0,
                        },
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        // <Footer />
    );
}
