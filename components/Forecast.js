import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Forecast(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.bigText}>
                {props.main}
            </Text>
            <Text style={styles.mainText}>
                Warunki: {props.description}
            </Text>
            <Text style={styles.bigText}>
                {parseInt(props.temp)}&#8451;
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 130
    },
    bigText: {
        flex: 2,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFFFFF'
    },
    mainText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF'
    }
});