import { View, Text, FlatList, StyleSheet } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CategoryList from './CategoryList';
import DrawerMenu from './DrawerMenu';
import Home from './Home';
import AdvertPage from "../Components/AdvertPage";
import ProductListPage from "../Components/ProductListPage";
import CategoryLine from "../Components/CategoryLine";

import categories from '../JsonFiles/Categories.json';

import { store } from '../ReduxToolkit/store';
import { Provider } from 'react-redux';

const Drawer = createDrawerNavigator();

const Root = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Drawer.Navigator screenOptions={{
                    drawerStyle: {
                        backgroundColor: '#000',
                        width: 240,
                    },
                }}
                    drawerContent={(props) => <DrawerMenu {...props} />}
                >
                    <Drawer.Screen name="Home" component={Home} options={{
                        title: "Anasayfa",
                        headerTitle: 'github.com/bozalp',
                        headerTintColor: 'white',
                        drawerInactiveTintColor: 'white',
                        headerStyle: { backgroundColor: '#175f92' },
                    }} />
                    <Drawer.Screen name="ProductListPage" component={ProductListPage} options={{
                        headerTitle: 'Başlık',
                        headerTintColor: 'white',
                        drawerInactiveTintColor: 'white',
                        headerStyle: { backgroundColor: '#175f92' },
                    }} />
                    <Drawer.Screen name="AdvertPage" component={AdvertPage} options={{
                        title: "İlan Detayı",
                        headerTitle: 'İlan Detayı',
                        headerTintColor: 'white',
                        drawerInactiveTintColor: 'white',
                        headerStyle: { backgroundColor: '#175f92' },
                    }} />
                    <Drawer.Screen name="CategoryLine" component={CategoryLine} options={{
                        title: "İlan Detayı",
                        headerTitle: 'İlan Detayı',
                        headerTintColor: 'white',
                        drawerInactiveTintColor: 'white',
                        headerStyle: { backgroundColor: '#175f92' },
                    }} />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default Root;