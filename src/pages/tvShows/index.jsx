import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { MovieCard } from '../../components/movie_card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getTvShowsByGenre } from '../../api/movies';
import { CircularProgress } from '@mui/material';

const GENRES = [
  'Action',
  'Adventure',
  'Drama',
  'Fantasy',
  'Horror',
  'Romance',
  'Thriller',
];

export default function TVShowsPage() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          GENRES.map((genre) =>
            getTvShowsByGenre(genre)
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
        <header className="mx-20 pb-5 mt-28 mb-10 border-b border-neutral-700">
          <p className="text-4xl font-bold text-yellow-200">
            TV Shows Available in Lumina
          </p>
        </header>
        <main className="homeMovies">
          {GENRES.map((genre) => (
            <MovieSection
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

function MovieSection({ title, movies, error }) {
  if (error)
    return (
      <div className="w-full flex flex-col px-20 mb-10">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <section
      className="w-full flex flex-col px-20 gap-7 mb-10"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold">{title}</h2>
      <ul className="w-full flex gap-5">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ul>
    </section>
  );
}
