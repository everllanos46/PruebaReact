import * as constants from '../../constants';

export const fetchColNews =(onSuccess)=>({
    payload: {
        method: 'GET',
        headers: constants.NEWS_TOKEN,
        url: constants.NEWS_URL+"co",
        success:onSuccess,
        source: 'News'
    }
})

export const fetchCountryNews =(name,onSuccess)=>({
    payload: {
        method: 'GET',
        headers: constants.NEWS_TOKEN,
        url: constants.NEWS_URL+name,
        success:onSuccess,
        source: 'News'
    }
})