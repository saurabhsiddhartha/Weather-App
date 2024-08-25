import React, { useState, useEffect } from 'react';
import './tempcard.css'

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const getFormattedDate = (datetime) => {
  const [date] = datetime.split(' ');
  return date; // Extract date part from 'YYYY-MM-DD HH:MM:SS'
};

const getNextFiveDaysForecast = (forecast) => {
  const seenDates = new Set();
  const filteredForecast = forecast.filter(element => {
    const date = getFormattedDate(element.dt_txt);
    const isUniqueDate = !seenDates.has(date);
    const isMorning = element.dt_txt.includes('09:00:00');

    if (isUniqueDate && isMorning) {
      seenDates.add(date);
      return true;
    }
    return false;
  }).slice(0, 5);

  return filteredForecast;
};


const TempCard = ({ weatherDetail, weather, iconUrl, forecastDetail, place, windSpeed }) => {
  const [forecast, setForecastDetail] = useState([]);
  useEffect(() => {
    if (forecastDetail && forecastDetail.list) {
      setForecastDetail(forecastDetail.list);
    }
  }, [forecastDetail]);

  const [url, setUrl] = useState(iconUrl);
  const [status, setWeather] = useState(weather);
  const [temp, setTemp] = useState(weatherDetail.temp);
  const [maxTemp, setMaxTemp] = useState(weatherDetail.temp_max);
  const [minTemp, setMinTemp] = useState(weatherDetail.temp_min);
  const [pressure, setPressure] = useState(weatherDetail.pressure);
  const [humidity, setHumidity] = useState(weatherDetail.humidity);
  const [sealevel, setSeaLevel] = useState(weatherDetail.sea_level);
  const [isFahrenheit, setIsFahrenheit] = useState(false);


  const fiveDayForecast = getNextFiveDaysForecast(forecast);
  // console.log(weather,"weather")
  //   console.log(forecastDetail,"forecast")

  const today = new Date();
  const dayNumber = today.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = daysOfWeek[dayNumber];

  const celToFeren = (temp) => {
    return (temp * 9 / 5) + 32;
  };

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };
  const currentTemp = isFahrenheit ? celToFeren(weatherDetail.temp) : weatherDetail.temp;
  const fmax = isFahrenheit ? celToFeren(weatherDetail.temp_max) : weatherDetail.temp_max;
  const fmin = isFahrenheit ? celToFeren(weatherDetail.temp_min) : weatherDetail.temp_min;
  return (
    <div className="temp-container">
      <div className="temp-main-container">
        <h2>Today</h2>
        <div className='temp-detail'>
          <div className='detail'>
            {!isFahrenheit ? <p>{Math.floor(temp)} &deg;C</p> : <p>{Math.floor(currentTemp)} &deg;F</p>}

            <p id='day-status'>{status.main}</p>
            <button id='degfrn' onClick={toggleTemperatureUnit}>
              {isFahrenheit ? '°C' : '°F'}
            </button>
          </div>
          <div className='cloud-status'>
            <img src={url} alt="" />
          </div>
        </div>
        <hr className="white-line" />
        <div>
          <p><i id='icon-distance' className="fa-regular fa-calendar"></i><label id='icon-distance'>
            {dayName}</label></p>
          <i id='icon-distance' className="fa-solid fa-location-dot"></i><label id='icon-distance'>{place.name}, {place.country} </label>
        </div>
        <div className="grid-container">
          <div className="grid">
            <label id='grid-detail'>{!isFahrenheit ? <p>{Math.floor(temp)} &deg;C</p> : <p>{Math.floor(fmax)} &deg;F</p>}
            </label>
            <h3>Max Temp</h3>
          </div>
          <div className="grid">
            <label id='grid-detail'>{windSpeed} k/h</label>
            <h3>Wind Speed</h3>
          </div>
          <div className="grid">
            <label id='grid-detail'>{humidity} %</label>
            <h3>Humidity</h3>
          </div>
          <div className="grid">
            <label id='grid-detail'>{!isFahrenheit ? <p>{Math.floor(temp)} &deg;C</p> : <p>{Math.floor(fmin)} &deg;F</p>}
            </label>
            <h3>Min-Temp</h3>
          </div>
          <div className="grid">
            <label id='grid-detail'>{pressure} </label>
            <h3>Pressure</h3>
          </div>
          <div className="grid">
            <label id='grid-detail'>{sealevel} </label>
            <h3>Sea Level</h3>
          </div>
        </div>
      </div>
      <div className="weekly-container">
        <h2>5 Days Forecast</h2>
        <hr className="white-line" />
        <div>
          {fiveDayForecast.map((element, index) => (
            <div key={index} className="forecast-grid">
              <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" />
              <label id="temp-font">{Math.floor(element.main.temp)} &deg;C </label>
              <h3>{getFormattedDate(element.dt_txt)}</h3>
              <h3>{element.weather[0].description}</h3>
              <hr className="white-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TempCard;
