import { KEY_WEATHER_API, ADDRESS_WEATHER_API } from './url/url';

const urlCode = (code) => {
    return `${ADDRESS_WEATHER_API}q=${code}&units=metric&APPID=${KEY_WEATHER_API}&lang=pl`;
};

function getWeather(code) {
    return fetch(urlCode(code))
        .then(response => response.json())
        .then(responseJson => {
            return {
                main: responseJson.weather[0].main,
                description: responseJson.weather[0].description,
                temp: responseJson.main.temp
            }
        })
        .catch(error => {
            console.error(error);
        });
};

export default { getWeather: getWeather };