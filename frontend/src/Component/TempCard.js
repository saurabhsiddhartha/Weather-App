import React, { useEffect } from 'react';
import axios from 'axios';

const TempCard = () => {
    const api_key = '8f110526e31c64d18e7f4539d30a357b';
    const cityname = 'lucknow';

    const getWeatherDetail = async (name, lat, lon, country, state) => {
        let forcastApi = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`)
        let weatherApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)

        console.log(weatherApi.data)
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${api_key}`);
            let { name, lat, lon, country, state } = response.data[0]
            getWeatherDetail(name, lat, lon, country, state)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts.

    return (
        <div className="temp-container">
            <div className="temp-main-container">
                <h2>Today</h2>
                <div className='temp-detail'>
                    <div className='detail'>
                        <p>24 C</p>
                        <p id='day-status'>Rain</p>

                    </div>

                    <div className='cloud-status'>
                        <i class="fa-solid fa-cloud-sun-rain"></i>
                    </div>
                </div>
                <hr class="white-line"></hr>
                <div>

                    <p><i id='icon-distance' class="fa-regular fa-calendar"></i><label id='icon-distance'>Wednesday</label></p>
                    <i id='icon-distance' class="fa-solid fa-location-dot"></i><label id='icon-distance'>Lucknow , Up , India</label>
                </div>

                <div className="grid-container">
                    <div className="grid">
                        <label id='grid-detail'>34 C</label>
                        <h3>Max-Temp</h3>
                    </div>
                    <div className="grid">
                        <label id='grid-detail'>34 C</label>
                        <h3>Wind Speed</h3>
                    </div>
                    <div className="grid">
                        <label id='grid-detail'>34 C</label>
                        <h3>Humidity</h3>
                    </div>
                    <div className="grid">
                        <label id='grid-detail'>34 C</label>
                        <h3>Min-Temp</h3>
                    </div>
                    <div className="grid">
                        <label id='grid-detail'>34 C</label>
                        <h3>Pressure</h3>
                    </div>
                    <div className="grid">
                        <label id='grid-detail'>34 C</label>
                        <h3>Sea Level</h3>
                        </div>

                </div>
            </div>
            <div className="weekly-container">
                 <h2>5 Days Forecast</h2>
                 <hr class="white-line"></hr> 
                  <div className="forecast-grid">
                  <label id='grid-detail'>34 C</label>
                  <h3>Monday</h3>
                  <h3>23/04/2024</h3> 
                  </div>
                 <hr class="white-line"></hr> 

                  <div className="forecast-grid"></div>
                 <hr class="white-line"></hr> 

                  <div className="forecast-grid"></div>
                 <hr class="white-line"></hr> 

                  <div className="forecast-grid"></div>
                 <hr class="white-line"></hr> 

                  <div className="forecast-grid"></div>
                 <hr class="white-line"></hr> 

            </div>
        </div>
    );
}

export default TempCard;
