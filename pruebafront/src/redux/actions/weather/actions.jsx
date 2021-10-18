import * as constants from '../../constants';

export const fetchColWeather =(onSuccess)=>({
    payload: {
        method: 'GET',
        headers: constants.WEATHER_TOKEN,
        url: constants.WEATHER_URL+"Valledupar"+constants.WEATHER_TOKEN,
        success:onSuccess,
        source: 'Weather'
    }
})