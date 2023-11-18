import { View, Text, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

const InfoTableRow = ({ title, value, textColor }) => {
    const theme = useSelector((state) => state.theme.theme)

    return (
        <View>
            <View style={styles.info_table}>
                <Text style={{ color: theme.color }}>
                    {title}
                </Text>
                <Text style={{ color: textColor,}}>
                    {value}
                </Text>
            </View>
            <View style={styles.seperate_line} />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        info_table:
        {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        seperate_line:
        {
            width: '100%',
            height: 1,
            backgroundColor: '#cecece',
            marginTop: 10,
            marginBottom: 10,
        },
    }
)

export default InfoTableRow;