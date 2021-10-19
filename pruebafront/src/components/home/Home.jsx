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
import { fetchColWeather} from "../../redux/actions/weather/actions";
import '../../styles/home.css';
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAllRecords, createRecord} from "../../redux/actions/record/actions";


const Home = () => {
    const dispatch = useDispatch();
    const [countries, setCountries] = useState([]);
    const [visibleSelect, setVisibleSelect] = useState(false);
    const [visibleSelectCities, setVisibleSelectCities] = useState(false);
    const [countrieSelect, setCountrieSelect] = useState("Colombia");
    const [initialCountrieSelect, setInitialCountrie] = useState("");
    const [stateSelect, setStateSelect] = useState("");
    const [colNews, setColNews] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [countryNews, setCountryNews] = useState([]);
    const [citySelect, setCitySelect] = useState("Valledupar");
    const [dataWeather, setDataWeather] = useState([]);
    const [countrySend, setCountrySend] = useState("");
    const [countrySelectSelected, setCountrySelectSelected] = useState("");

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
        dispatch(fetchColWeather(citySelect, countrySend,(res) => {
            setDataWeather(res.data[0]);
        }));
    }, []);

    useEffect(() => {
        setCountrySend(countrySelectSelected);  
    },[citySelect])

    useEffect(() => {
        debugger
        dispatch(fetchColWeather(citySelect, countrySend,(res) => {
            debugger
            setDataWeather(res.data[0]);
        }));
        if(countrySend!== ""){
            let data ={
                city: citySelect,
                information: (citySelect+", "+countrySend+" : "+dataWeather.temp + ", "+dataWeather.weather.description)
            }
            dispatch(createRecord(data, (res)=>{
                debugger
            }));
        }
    },[countrySend])

    


    useEffect(() => {
        if (countrySelectSelected !== "") {
            setVisibleSelect(false);
            searchCountry(countrieSelect);
            dispatch(fetchStates(countrySelectSelected, (res) => {
                setVisibleSelect(true);
                setStates(res);
            }))
        }
        if (stateSelect !== "") {
            setVisibleSelectCities(false);
            dispatch(fetchCities(stateSelect, (res) => {
                setVisibleSelectCities(true);
                setCities(res);
            }))
        }

    }, [countrySelectSelected, stateSelect]);

    

    useEffect(() => {
        if (initialCountrieSelect != "") {
            dispatch(fetchCountryNews(initialCountrieSelect, (res) => {
                setCountryNews(res.articles);
            }))
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

    if (countries.length == 0) return <CircularProgress style={{
        marginTop: '10%',
        marginLeft: '45%'
    }} size={100} />;

    return (
        <>
            <div className="float-card">
                <Card style={{
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                    "&:hover": {
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                    }
                }} sx={{ minWidth: 275 }}>
                    <CardContent  >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {citySelect}, {(countrySend=="")?countrieSelect:countrySend}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {dataWeather.temp}°
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {dataWeather.weather.description}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div >
                <Grid container>
                    <Grid item xs={12}>
                        <Carousel style={{ width: '80%', marginLeft:'10%', marginTop:'1%' }} >
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

            <div style={{ marginLeft: '20%' }}>
                <Grid container spacing={3}>

                    <Grid item xs={3} >
                        <Select
                            showSearch
                            id="country_select"
                            style={{ width: '100%' }}
                            onChange={setCountrySelectSelected}
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
                            onChange={setCitySelect}
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
                {
                    ((countryNews.length == 0) ? (
                        <CircularProgress style={{
                            marginTop: '10%',
                            marginLeft: '45%'
                        }} size={100} />

                    ) : (
                        <Grid container spacing={2} >
                            {
                                countryNews.length >= 0 && countryNews.map(item => (
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
                    ))
                }

            </div>



        </>

    );
};

export default Home;

