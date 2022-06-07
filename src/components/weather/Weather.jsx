import React from "react";
import './Weather.css';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

function Weather() 
{
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '39a9937614927ad36713be38d130cb3c',
    lat: '31.5204',
    lon: '74.3587',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  return (
  <div className="container">
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Lahore"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  </div>
  );
};

export default Weather;