import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useParams } from 'react-router';
import { MovieCard } from '../../components/movie_card';
import { CircularProgress } from '@mui/material';
import { ErrorAlert } from '../../components/alerts';
import { searchMoviesByTitle } from '../../api/movies';

export default function SearchPage() {
  const { title } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchByTitle = async () => {
    try {
      setIsLoading(true);
      const response = await searchMoviesByTitle(title);
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchByTitle();
  }, [title]);

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
            Search results of "{title}"
          </h1>
        </header>
        <main>
          <section className="w-full flex flex-wrap gap-5">
            {data && data.length > 0 ? (
              data.map((item) => <MovieCard key={item.movie_id} movie={item} />)
            ) : (
              <p className="text-xl">No results found for "{title}".</p>
            )}
          </section>
        </main>
      </div>
      {error && <ErrorAlert alertText={error} />}
      <Footer />
    </React.Fragment>
  );
}
