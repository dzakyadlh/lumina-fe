import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getMoviesByGenre } from '../../api/movies';
import { CircularProgress } from '@mui/material';
import { MovieList } from '../../components/movie_list';

const GENRES = [
  'Action',
  'Adventure',
  'Drama',
  'Fantasy',
  'Horror',
  'Romance',
  'Thriller',
];

export default function MoviesPage() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          GENRES.map((genre) =>
            getMoviesByGenre(genre)
              .then((response) => ({ genre, data: response }))
              .catch((error) => ({ genre, error }))
          )
        );

        const newData = {};
        const newErrors = {};

        results.forEach((result) => {
          if (result.error) {
            newErrors[result.genre] =
              result.error.response?.status === 404
                ? `${result.genre} not found`
                : 'An error occurred';
          } else {
            newData[result.genre] = result.data;
          }
        });

        setData(newData);
        setErrors(newErrors);
      } finally {
        setIsLoading(false);
      }
    };

    AOS.init({
      duration: 1000,
      offset: 100,
    });

    fetchAllData();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <React.Fragment>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col">
        <header className="mx-5 sm:mx-20 pb-5 mt-28 mb-10 border-b border-neutral-700">
          <p className="text-3xl md:text-4xl font-bold text-yellow-200">
            Movies Available in Lumina
          </p>
        </header>
        <main className="homeMovies">
          {GENRES.map((genre) => (
            <MovieList
              key={genre}
              title={genre.charAt(0).toUpperCase() + genre.slice(1)}
              movies={data[genre] || []}
              error={errors[genre]}
            />
          ))}
        </main>
      </div>
    </React.Fragment>
  );
}
