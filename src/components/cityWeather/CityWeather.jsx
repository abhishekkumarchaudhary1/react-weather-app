import React, { useEffect, useState } from 'react';
import { CgCompressV } from 'react-icons/cg';
import { CiTempHigh } from 'react-icons/ci';
import { FaWind } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';

const CityWeather = ({ cityName }) => {
  const [weather, setWeather] = useState({ name: '', temperature: '', condition: '', humidity: '', windSpeed: '', pressure: '' });

  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const getCityWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
    //   console.log(data);
      setWeather({
        name:`${(data.name.toUpperCase())}`,
        temperature: `${Math.round(data.main.temp)}°C`,
        condition: `${data.weather[0].main}`,
        humidity: `${data.main.humidity}`,
        windSpeed: `${Math.round(data.wind.speed * 3.6)} km/hr`,
        pressure: `${Math.round(data.main.pressure)}mb`,

        iconURL : `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      });
    } catch (error) {
      console.log('Error: City not found!!!');
    }
  };

  useEffect(() => {
    getCityWeather(cityName);
  }, [cityName]);

  return (
    <section className='weatherSection w-[80%] max-w-96 my-3 mx-auto'>
        <div className='card bg-white text-2xl flex flex-wrap justify-between items-center my-3 p-2 rounded-md drop-shadow-md'>
            <div className="locationDiv bg-slate-500 w-[100px] h-[100px] flex-col justify-between items-center my-3 mx-auto p-3 rounded-sm">
                <FaLocationDot className='text-white' />
                <h1 className=' text-white font-bold rounded-sm'>{weather.name}</h1>
            </div>
            <div className='tempDiv w-[100px] h-[100px] flex-col justify-between items-center my-3 mx-auto p-3 rounded-sm'>
                <CiTempHigh />
                <p>{weather.temperature}</p>

            </div>
            <div className='conditionDiv border rounded w-[100px] flex-col justify-between items-center my-3 mx-auto p-3'>
                <img className='bg-slate-500 rounded-sm' src={weather.iconURL} alt="" />
                <p className='text-center'>{weather.condition}</p>

            </div>

        </div>
        <div className='card bg-white text-2xl flex flex-wrap justify-between items-center my-3 p-2 rounded-md drop-shadow-md'>
            <div className="humidityDiv bg-slate-500 text-white w-[100px] h-[100px] flex-col justify-between items-center my-3 mx-auto p-3 rounded-sm">

                <WiHumidity className='text-sm text-center md:text-md lg:text-lg' />
                <h2 className='text-sm text-center md:text-md'>Humidity</h2>
                <p className='text-sm text-center md:text-md lg:text-lg'>{weather.humidity}</p>
            </div>
            <div className="windSpeedDiv bg-slate-500 text-white w-[100px] h-[100px] flex-col justify-between items-center my-3 mx-auto p-3 rounded-sm">

                <FaWind className='text-sm text-center md:text-md lg:text-lg' />
                <h2 className='text-sm text-center md:text-md'>Wind Speed</h2>
                <p className='text-sm text-center md:text-md lg:text-lg'>{weather.windSpeed}</p>
            </div>
            <div className="pressureDiv bg-slate-500 text-white w-[100px] h-[100px] flex-col justify-between items-center my-3 mx-auto p-3 rounded-sm">

                <CgCompressV className='text-sm text-center md:text-md lg:text-lg' />
                <h2 className='text-sm text-center md:text-md'>Pressure</h2>
                <p className='text-sm text-center md:text-md lg:text-lg'>{weather.pressure}</p>
            </div>
            
        </div>
    </section>
  );
};

export default CityWeather;
