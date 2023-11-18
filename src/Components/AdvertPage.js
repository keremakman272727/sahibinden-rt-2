import { View, Text, FlatList, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from 'react';

import InfoTableRow from "./InfoTableRow";
import Location from "./Location";

import { useSelector } from 'react-redux';

const CategoriesFilePath = './main/src/JsonFiles/Details.json'; 

import axios from 'axios';

const AdvertPage = ({ route }) => {
    const theme = useSelector((state) => state.theme.theme)
    const [data, setData] = useState([{}]);
    const [activeTab, setActiveTab] = useState(0);
    const [images, setImages] = useState([{}]);
    const { id } = route.params;
    const [isLoading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(detailsUrl);
            //console.log(response.data);
            const datas = response.data.find(d => d.id === id);
            setData(datas);
            setImages(datas.images);
            setLoading(true);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    function changeTab(tabNo) {
        //0- İlan bilgileri  
        //1- Açıklama
        //2- Konum
        setActiveTab(tabNo);
    }

    return (
        isLoading ?
            <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                <View style={styles.title}>
                    <Text style={{ color: theme.color }}>
                        {data?.title}
                    </Text>
                </View>
                {
                    <Image key={id} source={{
                        uri: images[0].toString(),
                    }} style={styles.images} />
                }
                <View style={[styles.title, { height: 40, backgroundColor: theme.backgroundColor }]}>
                    <Text style={{ color: theme.color, fontWeight: "700" }}>
                        {data?.owner}
                    </Text>
                </View>
                <View style={styles.sub_title}>
                    <Text style={{ color: theme.priceColor }}>
                        {data?.subTitle}
                    </Text>
                    <Text style={{ color: '#969696' }}>
                        {data?.location}
                    </Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.altButtons, { backgroundColor: activeTab === 0 ? '#fec818' : theme.backgroundColor }]} activeOpacity={0.7}
                        onPress={() => changeTab(0)}>
                        <Text style={{ color: theme.color }}>
                            İlan Bilgileri
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.altButtons, { backgroundColor: activeTab === 1 ? '#fec818' : theme.backgroundColor }]} activeOpacity={0.7}
                        onPress={() => changeTab(1)}>
                        <Text style={{ color: theme.color }}>
                            Açıklama
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.altButtons, { backgroundColor: activeTab === 2 ? '#fec818' : theme.backgroundColor }]} activeOpacity={0.7}
                        onPress={() => changeTab(2)}>
                        <Text style={{ color: theme.color }}>
                            Konumu
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 2, backgroundColor: '#fec818', top: -11, }} />

                <View style={{ padding: 10 }}>
                    {
                        activeTab === 0 ?
                            <View>
                                <InfoTableRow title={"Fiyat"} value={data?.price} textColor={theme.priceColor} />
                                <InfoTableRow title={"İlan Tarihi"} value={data?.publishDate} textColor='#969696' />
                                <InfoTableRow title={"İlan No"} value={data?.id} textColor='#ff6600' />
                                <Text style={{ color: theme.color }}>
                                    İlan tipine göre değişen bilgiler...
                                </Text>
                            </View>
                            :
                            activeTab === 1 ?
                                <View>
                                    <Text style={{ color: theme.color }}>
                                        {data?.description}
                                    </Text>
                                </View> :
                                <View>
                                    <Location coordinates={data?.location_points[0]} />
                                </View>
                    }
                </View>
            </View >
            :
            <ActivityIndicator />
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            //height: '100%'
        },
        images:
        {
            width: '100%',
            height: 250
        },
        title:
        {
            width: '100%',
            height: 48,
            justifyContent: 'center',
            alignItems: 'center'
        },
        sub_title:
        {
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button:
        {
            padding: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        altButtons:
        {
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
        },
    }
)

export default AdvertPage;