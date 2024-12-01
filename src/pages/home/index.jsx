import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPlay } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  getLatestMovies,
  getPopularMovies,
  getPopularSeries,
  getTrendingMovies,
} from '../../api/movies';
import { CircularProgress } from '@mui/material';
import Footer from '../../components/footer';
import { MovieList } from '../../components/movie_list';
import {
  CustomFilledButton,
  CustomSecondaryButton,
} from '../../components/custom_buttons';

export default function HomePage() {
  const [data, setData] = useState({
    trending: [],
    popular: [],
    popularSeries: [],
    latest: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    trending: null,
    popular: null,
    popularSeries: null,
    latest: null,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [trending, popular, popularSeries, latest] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getPopularSeries(),
          getLatestMovies(),
        ]);

        setData({
          trending,
          popular,
          popularSeries,
          latest,
        });
      } catch (error) {
        // Handle errors for specific datasets
        setErrors((prev) => ({
          ...prev,
          trending:
            error.response?.status === 404 ? 'Trending not found' : null,
          popular: error.response?.status === 404 ? 'Popular not found' : null,
          popularSeries:
            error.response?.status === 404 ? 'Popular series not found' : null,
          latest: error.response?.status === 404 ? 'Latest not found' : null,
        }));
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
        {data.trending.length > 0 && (
          <>
            <img
              src={data.trending[0].imageUrl}
              alt={`${data.trending[0].title} (${data.trending[0].releaseYear})`}
              className="absolute h-screen w-full object-cover object-top top-0 right-0 z-[-10] filter brightness-50"
            />
            <div className="absolute h-full w-full bg-gradient-to-r from-black via-transparent to-transparent top-0 left-0 z-[-5]"></div>
            <header className="h-screen md:h-[70vh] w-full md:w-3/5 lg:w-2/5 flex flex-col justify-center p-10 xl:px-20 gap-5">
              <p className="text-4xl font-bold">{data.trending[0].title}</p>
              <p className="line-clamp-6">{data.trending[0].plot}</p>
              <div className="flex items-center gap-5">
                <CustomFilledButton
                  btnText="Play"
                  onClick={() => {}}
                  icon={faPlay}
                />
                <CustomSecondaryButton
                  btnText="Watch Later"
                  onClick={() => {}}
                  icon={faAdd}
                />
              </div>
            </header>
          </>
        )}
        <main className="homeMovies">
          <MovieList
            title="Popular Movies on Lumina"
            movies={data.popular}
            error={errors.popular}
          />
          <MovieList
            title="Popular Series on Lumina"
            movies={data.popularSeries}
            error={errors.popularSeries}
          />
          <MovieList
            title="Trending Now"
            movies={data.trending}
            error={errors.trending}
          />
          <MovieList
            title="New Releases"
            movies={data.latest}
            error={errors.latest}
          />
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
}
