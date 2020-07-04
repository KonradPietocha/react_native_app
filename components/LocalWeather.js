import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import Forecast from './Forecast';
import WeatherMap from './WeatherMap';

export default function LocalWeather() {
    const [state, setState] = useState({
        code: "",
        forecast: null
    });
    const handleTextChange = event => {
        let code = event.nativeEvent.text;
        WeatherMap.getWeather(code).then(forecast => {
            console.log(forecast);
            setState(state => ({ ...state, forecast: forecast }));
        });
        setState(state => ({ ...state, code: event.nativeEvent.text }));
    };
    let content = null;
    if (state.forecast !== null) {
        content = (
            <Forecast 
                main={state.forecast.main}
                description={state.forecast.description}
                temp={state.forecast.temp}
            />
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                You entered {state.code}.
            </Text>
            {content}
            <TextInput 
                style={styles.input}
                onSubmitEditing={handleTextChange}
            />
            <Text style={styles.instructions}>
                {instructions}
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9acd32',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    input: {
        fontSize: 20,
        borderWidth: 2,
        padding: 2,
        height: 40,
        width: 100,
        textAlign: 'center'
    }
});

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu'
});
