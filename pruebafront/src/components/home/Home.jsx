import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Row, Col } from "antd";
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
//import Select from '@mui/material/Select';
import { fetchUniversalToken, fetchAllCountries, fetchStates, fetchCities } from '../../redux/actions/universal/actions'
import { fetchColNews, fetchCountryNews } from "../../redux/actions/news/actions";
import '../../styles/home.css';


const Home = () => {
    const dispatch = useDispatch();
    const [countries, setCountries] = useState([]);
    const [visibleSelect, setVisibleSelect] = useState(false);
    const [visibleSelectCities, setVisibleSelectCities] = useState(false);
    const [countrieSelect, setCountrieSelect] = useState("");
    const [initialCountrieSelect, setInitialCountrie] = useState("");
    const [stateSelect, setStateSelect] = useState("");
    const [colNews, setColNews] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [countryNews, setCountryNews] = useState([]);

    useEffect(() => {
        dispatch(fetchUniversalToken((res) => {
            localStorage.setItem('token-universal', res.auth_token);
        }));
        dispatch(fetchAllCountries((res) => {
            setCountries(res);
        }));
        dispatch(fetchColNews((res) => {
            setColNews(res.articles);
        }));
    }, []);


    useEffect(() => {
        if (countrieSelect !== "") {
            searchCountry(countrieSelect);
            dispatch(fetchStates(countrieSelect, (res) => {
                setVisibleSelect(true);
                setStates(res);
            }))
        }
        if (stateSelect !== "") {
            dispatch(fetchCities(stateSelect, (res) => {
                setVisibleSelectCities(true);
                setCities(res);
            }))
        }

    }, [countrieSelect, stateSelect]);

    useEffect(() => {
        if (initialCountrieSelect != "") {
            dispatch( initialCountrieSelect, (res) => {
                setCountryNews(res);
            })
        }
    }, [initialCountrieSelect]);

    const searchCountry = (country) => {
        countries.forEach((c) => {
            if (c.country_name == country) {
                setInitialCountrie((c.country_short_name.toLowerCase()) + "");
            }
        })
    }




    const countriesSelector = useSelector((state) => state.universal);

    if (colNews.length == 0) return null;

    return (
        <>
            <div className="float-card">
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            a
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Grid container>
                    <Grid item xs={6} md={8} sm={6}>
                        <Carousel>
                            {
                                colNews.length >= 0 && colNews.map(item => (
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={item.urlToImage}
                                            alt="First slide"
                                            width="400"
                                            height="400"
                                        />
                                        <Carousel.Caption>
                                            <h3 className="title-carousel" >{item.title}</h3>
                                            <p>{item.description}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </Grid>
                </Grid>

            </div>
            <br />

            <div style={{ marginLeft: '15px' }}>
                <Grid container spacing={2}>

                    <Grid item xs={3} >
                        <Select
                            showSearch
                            id="country_select"
                            style={{ width: '100%' }}
                            onChange={setCountrieSelect}
                            defaultValue={""}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <option value="" >Seleccione...</option>
                            {
                                countries.length != 0 && countries.map(item => (
                                    <option value={item.country_name}>{item.country_name}</option>

                                ))
                            }

                        </Select>
                    </Grid>
                    <Grid item xs={3} >
                        <Select
                            showSearch
                            id="state_select"
                            style={{ width: '100%' }}
                            defaultValue={""}
                            onChange={setStateSelect}
                            disabled={!visibleSelect}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <option value="" >Seleccione...</option>
                            {
                                states.length != 0 && states.map(item => (
                                    <option value={item.state_name}>{item.state_name}</option>

                                ))
                            }

                        </Select>
                    </Grid>
                    <Grid item xs={3} >
                        <Select
                            showSearch
                            id="city_select"
                            style={{ width: '100%' }}
                            defaultValue={""}
                            disabled={!visibleSelectCities}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <option value="" >Seleccione...</option>
                            {
                                cities.length != 0 && cities.map(item => (
                                    <option value={item.city_name}>{item.city_name}</option>

                                ))
                            }

                        </Select>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2} >
                    {
                        colNews.length >= 0 && colNews.map(item => (
                            <Grid item xs={3}>

                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item.urlToImage}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    }


                </Grid>
            </div>



        </>

    );
};

export default Home;