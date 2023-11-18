import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import CategoryLine from "../Components/CategoryLine";

import { useNavigation } from '@react-navigation/native';
import Icons from '@expo/vector-icons/FontAwesome';
import Icons2 from '@expo/vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from '../ReduxToolkit/Slices/themeSlice';

import axios from 'axios';
const CategoriesFilePath = './sahibindenUiStudy-ReactNative-main/src/JsonFiles/Categories.json'; 

const CustomButton = ({ title, iconName, whichPage }) => {
    const navigation = useNavigation();

    function GoOtherPage() {
        navigation.navigate(whichPage);
    }

    return (
        <TouchableOpacity style={styles.header_button} activeOpacity={0.7} onPress={GoOtherPage}>
            <Icons2 name={iconName} size={20} color="#fff" />
            <Text style={styles.header_title}>
                {title}
            </Text>
            <Icons name={"angle-right"} size={20} color="#fff" style={{ position: "absolute", right: 0, }} />
        </TouchableOpacity>
    )
}
const DrawerMenu = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(CategoriesURL);
            //console.log(response.data);
            setCategories(response.data);
            setLoading(true);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    function getTitle(title) {
        if (title.length > 20)
            return title.slice(0, 20) + "..."
        else
            return title;
    }

    function changeTheme() {
        theme.title === "Dark" ? dispatch(setLight()) : dispatch(setDark());
    }

    const renderItems = ({ item }) => <CategoryLine iconBackground={item.iconBackground} iconName={item.iconName} title={getTitle(item.title)} subTitle={getTitle(item.subTitle)} isMenu={true} category={item.category} />

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            {isLoading ?
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.header}>
                            <CustomButton title={"Anasayfa"} iconName={"home"} whichPage={"CategoryList"} />
                            <CustomButton title={"Bana Özel"} iconName={"person"} />
                            <CustomButton title={"İlan Ver"} iconName={"add"} />
                        </View>
                    }
                    ListFooterComponent={
                        <View style={styles.footer}>
                           
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ color: theme.title === "Dark" ? 'white' : 'black' }}>
                                Anasayfa
                            </Text>
                        </View>
                    }
                    data={categories}
                    renderItem={renderItems} />
                :
                <ActivityIndicator />
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        footer:
        {
            height: 100,
            padding: 10,
        },
        mode_button:
        {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10
        },
        header:
        {
            paddingTop: 60,
            padding: 18,
            backgroundColor: '#195e90',
            height: 200,
            width: '100%',
        },
        header_button:
        {
            height: 50,
            flexDirection: 'row',
        },
        header_title:
        {
            color: 'white',
            paddingLeft: 20,
            fontSize: 16,
        }
    }
)

export default DrawerMenu;