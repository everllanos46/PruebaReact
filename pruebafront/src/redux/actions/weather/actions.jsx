import * as constants from '../../constants';

export const fetchColWeather =(city,country,onSuccess)=>({
    payload: {
        method: 'GET',
        headers: constants.WEATHER_TOKEN,
        url: constants.WEATHER_URL+city+"&country="+country+constants.WEATHER_TOKEN,
        success:onSuccess,
        source: 'Weather'
    }
})