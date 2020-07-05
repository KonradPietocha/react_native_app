import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, TextInput, ImageBackground } from 'react-native';
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
            <ImageBackground
                source={require('./img/kwiaty.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.overlay}>
                    <View style={styles.textLine}>
                        <Text style={styles.mainText}>
                            {state.code === "" ?
                                "Wpisz swój kod pocztowy"
                                :
                                "Bieżąca pogoda dla"
                            }
                        </Text>
                        <View style={styles.codeContainer}>
                            <TextInput
                                style={[styles.postCode, styles.inputText]}
                                onSubmitEditing={handleTextChange}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <Text style={styles.instructions}>
                            {instructions}
                        </Text>
                        <StatusBar style="auto" />
                    </View>
                    {content}
                </View>
            </ImageBackground>
        </View>
    );
}

const baseFontSize = 16;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1,
        flexDirection: 'column'
    },
    overlay: {
        paddingTop: 5,
        backgroundColor: '#000000',
        opacity: 0.5,
        flexDirection: "column",
        alignItems: "center"
    },
    textLine: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
    },
    codeContainer: {
        height: (baseFontSize + 25),
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: -6
    },
    postCode: {
        flex: 1,
        flexBasis: 1,
        width: 60
    },
    mainText: {
        fontSize: baseFontSize,
        color: '#FFFFFF',
        marginBottom: 15
    },
    inputText: {
        fontSize: baseFontSize,
        color: '#FFFFFF'
    }
});

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu'
});
