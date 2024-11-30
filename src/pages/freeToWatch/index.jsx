import React, { useEffect, useState } from 'react';
import { getRandomMovies, getRandomTvShows } from '../../api/movies';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { MovieCard } from '../../components/movie_card';
import { CircularProgress } from '@mui/material';

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
          const responseShows = await getRandomTvShows(i);
          fetchedData.push(...responseShows);

          // Fetch random movies
          const responseMovies = await getRandomMovies(i);
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
      <div className="min-h-screen w-full flex flex-col px-20 py-28 gap-10">
        <header>
          <h1 className="font-bold text-4xl">This week's free to watch list</h1>
        </header>
        <main>
          <section className="w-full flex flex-wrap gap-5">
            {data.map((item, index) => (
              <MovieCard key={index} movie={item} />
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
}
