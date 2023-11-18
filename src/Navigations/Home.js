import { View, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import CategoryList from "./CategoryList";
import ProductListPage from "../Components/ProductListPage";
import AdvertPage from "../Components/AdvertPage";
import CategoryLine from "../Components/CategoryLine";

const Home = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CategoryList" component={CategoryList} options={{ headerShown: false }} />
            <Stack.Screen name="ProductListPage" component={ProductListPage} options={{ headerShown: false }} />
            <Stack.Screen name="AdvertPage" component={AdvertPage} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryLine" component={CategoryLine} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Home;