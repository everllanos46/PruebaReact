import * as constants from '../../constants';

export const fetchAllRecords =(onSuccess)=>({
    payload: {
        method: 'GET',
        headers: '',
        url: constants.RECORD_URL+'/api/History',
        success:onSuccess,
        source: 'MyRecord'
    }
})

export const createRecord = (data,onSuccess) => ({
    payload: {
        method: 'POST',
        headers: '',
        url: constants.RECORD_URL+'/api/History',
        data: data,
        postProcessSuccess:onSuccess,
        source: 'MyRecord'
    }
});