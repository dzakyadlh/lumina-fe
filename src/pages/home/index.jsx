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
  const [page, setPage] = useState({
    trending: 1,
    popular: 1,
    popularSeries: 1,
    latest: 1,
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
        <img
          src="/images/theglory.jpg"
          alt="banner poster"
          className="absolute h-screen w-full md:w-4/5 object-cover object-top top-0 right-0 z-[-10] filter brightness-50"
        />
        <div className="absolute h-full w-full bg-gradient-to-r from-black via-transparent to-transparent top-0 left-0 z-[-5]"></div>
        <header className="h-screen md:h-[70vh] w-full md:w-2/5 flex flex-col justify-center p-10 gap-5">
          <p className="text-4xl font-bold">The Glory</p>
          <p className="">
            A young woman, bullied to the point of deciding to drop out of
            school, plans the best way to get revenge. After becoming a primary
            school teacher, she takes in the son of the man who tormented her
            the most to enact her vengeance.
          </p>
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#fde68a' }}
              className="w-fit px-10 py-3 bg-black dark:bg-white border-neutral-600 border rounded-full text-white dark:text-black font-semibold"
              onClick={() => {}}
            >
              <div className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faPlay} className="w-5 h-5 text-black" />
                Play
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-fit px-10 py-3 bg-neutral-500 border-neutral-600 border rounded-full text-white font-semibold"
              onClick={() => {}}
            >
              <div className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faAdd} className="w-5 h-5 text-white" />
                Watch Later
              </div>
            </motion.button>
          </div>
        </header>
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
