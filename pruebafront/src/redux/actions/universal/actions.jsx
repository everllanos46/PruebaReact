import * as constants from '../../constants';

export const fetchAllCountries =(onSuccess)=>({
    payload: {
        method: 'GET',
        headers: constants.UNIVERSAL_TOKEN,
        url: constants.UNIVERSAL_URL+'/api/countries/',
        success:onSuccess,
        source: 'Universal'
    }
})

export const fetchStates =(country,onSuccess)=>({
    payload: {
        method: 'GET',
        headers: constants.UNIVERSAL_TOKEN,
        url: constants.UNIVERSAL_URL+'/api/states/'+country,
        success:onSuccess,
        source: 'Universal'
    }
})

export const fetchCities =(state,onSuccess)=>({
    payload: {
        method: 'GET',
        headers: constants.UNIVERSAL_TOKEN,
        url: constants.UNIVERSAL_URL+'/api/cities/'+state,
        success:onSuccess,
        source: 'Universal'
    }
})

export const fetchUniversalToken=(onSuccess)=>({
    payload: {
        method: 'GET',
        headers: constants.UNIVERSAL_TOKEN,
        url: constants.UNIVERSAL_URL+'/api/getaccesstoken',
        success:onSuccess,
        source: 'UniversalToken'
    }
})



const getCountries=(countries)=>({
    type: constants.GET_COUNTRIES,
    payload: countries
})