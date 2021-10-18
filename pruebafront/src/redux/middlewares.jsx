import axios from "axios";
import * as constants from './constants';

export const Middlewares =
    ({ dispatch, getState }) =>
        (next) =>
            (action) => {
                let BASE_URL;
                let headers;

                const { url, method, success, data, postProcessError, source } =
                    action.payload;
                if (source == 'UniversalToken') {
                    BASE_URL = url;
                    headers = {
                        "Accept": "application/json",
                        "api-token": constants.UNIVERSAL_TOKEN,
                        "user-email": "evergamescol@gmail.com"
                    }

                } else if (source == 'Universal') {
                    let UNIVERSAL_TOKEN = localStorage.getItem('token-universal');
                    BASE_URL = url;
                    headers = {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${UNIVERSAL_TOKEN}`
                    }
                } else if (source == 'News') {
                    BASE_URL = url;
                    headers = {
                        "X-Api-Key": constants.NEWS_TOKEN,
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                } else if (source == 'Weather') {
                    BASE_URL = url;
                    headers = {
                        "content-type": "application/json; charset=utf-8",
                        "keep-alive": "timeout=5"
                    }
                }

                axios({
                    method,
                    url: BASE_URL,
                    data: data != undefined ? data : null,
                    headers: headers
                })
                    .then((response) => {
                        if (success) dispatch(success(response.data));
                    })
                    .catch((err) => {
                        if (!err.response) console.warn(err);


                    });


            }
