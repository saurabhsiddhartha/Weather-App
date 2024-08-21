import React, { useState ,useEffect } from "react";
import axios from 'axios';
import TempCard from "./TempCard";

const Home = () => {
    const [city, setCity] = useState("Lucknow"); 
    const [forecastDetail, setForecastDetail] = useState([]);
    const [weatherDetail, setWeatherDetail] = useState({});
    const [weather ,setWeather] = useState({});
    const [loading, setLoading] = useState(false);  
    const api_key = '8f110526e31c64d18e7f4539d30a357b';

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const searchCity = async () => {
        setLoading(true);  // Start loading
        try {
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`);
            const { lat, lon } = response.data[0]; 
            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`);
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`);
            const weatherIcon = await axios.get(`https://openweathermap.org/img/wn/10d@2x.png`)
            setForecastDetail(forecastResponse.data);
            setWeather(weatherResponse.data.weather)
            console.log(weather[0].main)
            // console.log(weatherResponse.data)
            setWeatherDetail(weatherResponse.data.main);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);  // End loading
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
                        value={city}
                        onChange={handleChange}
                    />
                    <button onClick={searchCity}>Search</button>
                </div>
                {loading ? (
                    <p>Loading...</p>  // Loading message
                ) : (
                    <TempCard city={city} apikey={api_key} weatherDetail={weatherDetail} weather={weather} />
                )}
            </div>
        </>
    );
}

export default Home;
