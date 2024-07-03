import React, { useState } from 'react';
import './index.css'
import { FaGithub, FaSearch } from 'react-icons/fa';
import CityTrivia from './components/cityTrivia/CityTrivia';
import CityWeather from './components/cityWeather/CityWeather';

const App = () => {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');



  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchCity(city);
  };

  return (
    <>
      <h1 className='text-center font-bold my-4'>Weather App  by Abhishek</h1>
      <a href="" className='bg-slate-500 text-white text-center p-3 flex justify-around items-center rounded-sm mx-auto my-4 w-[100px] hover:opacity-80'><FaGithub />GitHub</a>
    <section className="searchSection bg-white drop-shadow-md w-[80%] max-w-96 mx-auto p-5 rounded-md">

      <form
        onSubmit={handleSearch}
        className='flex justify-around items-center'
      >
        <input
          className='w-[70%] p-3'
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit" className='w-[20%] h-10 bg-slate-600 flex justify-around items-center text-white rounded-sm hover:opacity-80'><FaSearch /></button>
      </form>
    </section>
      
    {searchCity && (
      <>
        <CityWeather cityName={searchCity} />
        <CityTrivia cityName={searchCity} />
      </>
    )}
    </>
  );
};

export default App;

