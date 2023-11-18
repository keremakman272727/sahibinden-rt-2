import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, Alert } from "react-native";
import CategoryLine from "../Components/CategoryLine";

import axios from 'axios';
import { useSelector } from 'react-redux';

const CategoriesFilePath = './sahibindenUiStudy-ReactNative-main/src/JsonFiles/Categories.json'; 

const SearchBar = () => {
    const theme = useSelector((state) => state.theme.theme)
    const [text, setText] = useState('');

    return (
        <View style={[styles.searchBar_area, { backgroundColor: theme.backgroundColor }]}>
            <TextInput placeholder="Kelime ara"
                placeholderTextColor={'#959595'}
                onChangeText={newText => setText(newText)} style={[styles.searchBar, { color: theme.color }]} />
        </View>
    )
}

const CategoryList = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme)
    const [categories, setCategories] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(CategoriesURL);
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

    const renderItems = ({ item }) => <CategoryLine theme={theme} iconBackground={item?.iconBackground} iconName={item?.iconName} category={item?.category} title={item?.title} subTitle={item?.subTitle} />

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            {isLoading ?
                <FlatList
                    ListHeaderComponent={
                        <SearchBar />
                    }
                    ListFooterComponent={
                        <Text style={[styles.footer, { color: theme.color }]}>
                            Kerem Akman ---- github.com/keremakman272727
                        </Text>
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
        searchBar:
        {
            height: 50,
            width: '100%',
            borderWidth: 1,
            borderColor: '#969696',
            padding: 10,
            margin: 10,
        },
        searchBar_area:
        {
            height: 72,
            width: '100%',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        footer:
        {
            height: 50,
            padding: 10
        }
    }
)

export default CategoryList;