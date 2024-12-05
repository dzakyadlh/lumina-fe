import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { MovieCard } from '../../components/movie_card';
import { CircularProgress } from '@mui/material';
import { ErrorAlert } from '../../components/alerts';
import fetchMovies from '../../api/movies';

export default function FreeToWatchPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = [];
        for (let i = 1; i <= 2; i++) {
          // Fetch random TV shows
          const responseShows = await fetchMovies({
            randomized: true,
            title_type: 'tvSeries',
            page: i,
          });
          fetchedData.push(...responseShows);

          // Fetch random movies
          const responseMovies = await fetchMovies({
            randomized: true,
            title_type: 'movie',
            page: i,
          });
          fetchedData.push(...responseMovies);
        }
        setData(fetchedData);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
      <div className="min-h-screen w-full flex flex-col px-5 md:px-10 xl:px-20 pt-24 pb-5 md:py-28 gap-10">
        <header>
          <h1 className="font-bold text-3xl md:text-4xl">
            This week's free to watch
          </h1>
        </header>
        <main>
          <section className="w-full flex flex-wrap justify-center gap-5">
            {data.map((item) => (
              <MovieCard key={item.movie_id} movie={item} />
            ))}
          </section>
        </main>
      </div>
      {error && <ErrorAlert alertText={error} />}
      <Footer />
    </React.Fragment>
  );
}
