import React, { useState, useEffect } from "react";
import axios from 'axios';
import TempCard from "./TempCard";
import Loading from "./Loading";

const Home = () => {
    const [city, setCity] = useState("Lucknow");
    const [forecastDetail, setForecastDetail] = useState([]);
    const [weatherDetail, setWeatherDetail] = useState({});
    const [place, setPlace] = useState({})
    const [weather, setWeather] = useState({});
    const [iconUrl, setIconUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [windSpeed , setWindSpeed] = useState('');
    const api_key = '8f110526e31c64d18e7f4539d30a357b';

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const searchCity = async () => {
        setLoading(true);   
        try {
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`);

            let cityFound = false;

            for (let i = 0; i < response.data.length; i++) {
                if (city.toLowerCase() === response.data[i].name.toLowerCase()) {
                    cityFound = true;
                    break;  
                }
            }
            if (!cityFound) {
                alert("City not found. Please enter the correct city name.");
            }
 
            const { lat, lon } = response.data[0];

            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`);
            setForecastDetail(forecastResponse.data);
            // console.log(forecastDetail)
            // console.log(forecastDetail)

            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`);
            const weatherData = weatherResponse.data.weather[0];
            setWeather(weatherData);
            setWindSpeed(weatherResponse.data.wind.speed)
            setWeatherDetail(weatherResponse.data.main);
            setPlace(response.data[0])
 
            const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
            setIconUrl(iconUrl);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);  
        }
    };

    useEffect(() => {
        searchCity();
    }, []);

    return (
        <>
            <div className="cover-page">
                <h1>Current Weather</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter location"
                        name="city"
                        // value={city}
                        onChange={handleChange}
                    />
                    <button onClick={searchCity}>Search</button>
                </div>
                {loading ? (
                    <Loading/> // Loading message
                ) : (
                    <TempCard city={city} apikey={api_key} weatherDetail={weatherDetail} weather={weather} iconUrl={iconUrl} forecastDetail={forecastDetail} place={place} windSpeed ={windSpeed}/>
                )}
            </div>
        </>
    );
}

export default Home;
