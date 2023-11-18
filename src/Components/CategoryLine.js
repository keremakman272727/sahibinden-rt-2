import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icons from '@expo/vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CategoryLine = ({ iconBackground, iconName, category, title, subTitle, isMenu }) => {
    const theme = useSelector((state) => state.theme.theme)

    const navigation = useNavigation();

    function getSubTitle(subTitle) {
        if (subTitle.length > 40)
            return subTitle.slice(0, 40) + "..."
        else
            return subTitle;
    }

    function GoProductsPage() {
        navigation.navigate('ProductListPage', { category });
    }

    return (
        <View>
            <TouchableOpacity style={[styles.line, { backgroundColor: theme.backgroundColor }]} activeOpacity={0.7} onPress={GoProductsPage}>
                <View style={[styles.iconBg, { backgroundColor: iconBackground }]}>
                    <Icons name={iconName} size={20} color={theme.backgroundColor} />
                </View>
                <View>
                    <Text style={[styles.title, { color: theme.color }]}>
                        {title}
                    </Text>
                    <Text style={styles.subTitle}>
                        {
                            getSubTitle(subTitle)
                        }
                    </Text>
                </View>
                {
                    !isMenu && <Icons name={"angle-right"} size={20} color={theme.color} style={styles.right_arrow} />
                }
            </TouchableOpacity>
            <View style={styles.bottomLine} />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        line:
        {
            width: '100%',
            height: 64,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
        },
        iconBg:
        {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10
        },
        bottomLine:
        {
            backgroundColor: '#bfbfbf',
            height: 1,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            right: -60,
            flex: 1,
        },
        title:
        {
            fontSize: 16,
        },
        subTitle:
        {
            color: '#969696',
            fontSize: 12
        },
        right_arrow:
        {
            position: "absolute",
            right: 20,
        }
    }
)

export default CategoryLine;