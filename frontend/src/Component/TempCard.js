import React, { useEffect } from 'react';
import axios from 'axios';

const TempCard = () => { 
    const api_key = '8f110526e31c64d18e7f4539d30a357b';
    const cityname = 'Delhi';

    const getWeatherDetail = async(name ,lat,lon,country,state)=>{
        let forcastApi = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`)
        let weatherApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)

        console.log(weatherApi.data)
    } 
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${api_key}`);
            let {name , lat , lon , country,state} =response.data[0]
            getWeatherDetail(name , lat ,lon , country ,state) 
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
                <h2>Today's Temperature</h2>
            </div>
            <div className="card-container">
                {/* You can display the fetched data here */}
            </div>
        </div>
    );
}

export default TempCard;
