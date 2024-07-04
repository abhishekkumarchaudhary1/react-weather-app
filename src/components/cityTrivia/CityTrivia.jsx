import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const CityTrivia = ({ cityName }) => {
  const [trivia, setTrivia] = useState('');
  const [error, setError] = useState(null);

  const getCityTrivia = async (cityName) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${cityName}`
      );
      const data = await response.json();
      if (response.ok) {
        setTrivia(data.extract);
        setError(null);
      } else {
        throw new Error(data.detail);
      }
    } catch (error) {
      setError('No trivia found. Check your search');
      setTrivia('');
    }
  };

  useEffect(() => {
    if (cityName) {
      getCityTrivia(cityName);
    }
  }, [cityName]);

  return (
    <>
      {trivia ? (
        <section className='triviaSection w-[80%] max-w-96 my-3 mx-auto'>
          <div className='card bg-white text-2xl flex-col justify-between items-center my-3 p-2 rounded-md drop-shadow-md'>
            <FaQuoteLeft />
            <h2>Trivia</h2>
            <p className='text-sm bg-slate-500 text-white p-3 rounded md:text-md lg:text-lg'>{trivia}</p>
          </div>
        </section>
      ) : (
        <h2 className='bg-slate-500 text-white w-[80%] max-w-96 my-4 mx-auto p-3 text-center text-sm rounded'>
          {error || 'Loading...'}
        </h2>
      )}
    </>
  );
};

export default CityTrivia;
