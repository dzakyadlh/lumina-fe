import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPlay } from '@fortawesome/free-solid-svg-icons';
import { MovieCard } from '../../components/movie_card';
import './home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  getLatestMovies,
  getPopularMovies,
  getTrendingMovies,
} from '../../api/movies';

export default function HomePage() {
  const [trendingPlay, setTrendingPlay] = useState([]);
  const [popularPlay, setPopularPlay] = useState([]);
  const [newPlay, setNewPlay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await getTrendingMovies();
        console.log(response);
        setTrendingPlay(response);
      } catch (error) {
        setError(error);
      }
    };
    const fetchPopularData = async () => {
      try {
        const response = await getPopularMovies();
        console.log(response);
        setPopularPlay(response);
      } catch (error) {
        setError(error);
      }
    };
    const fetchLatestData = async () => {
      try {
        const response = await getLatestMovies();
        console.log(response);
        setNewPlay(response);
      } catch (error) {
        setError(error);
      }
    };
    AOS.init({
      duration: 1000, // animation duration in ms
      offset: 100, // offset from the viewport
    });
    AOS.refresh();
    fetchTrendingData();
    fetchPopularData();
    fetchLatestData();
  }, []);

  const items = [
    '/images/poster1.jpg',
    '/images/poster2.jpg',
    '/images/poster3.jpg',
    '/images/poster4.jpg',
    '/images/poster5.jpg',
  ];

  const repeatedItems = [...items, ...items];

  return (
    <React.Fragment>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col">
        <img
          src="/images/theglory.jpg"
          alt="banner poster"
          className="absolute w-3/5 right-0 z-[-10] filter brightness-50"
        />
        <header className="h-[70vh] w-2/5 flex flex-col justify-center p-10 gap-5">
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
          <section
            data-aos="fade-up"
            className="w-full flex flex-col px-20 gap-7 mb-10"
          >
            <h2 className="text-3xl font-bold">Popular on Lumina</h2>
            <ul className="w-full flex gap-5">
              {popularPlay.map((item, index) => {
                return <MovieCard movie={item} />;
              })}
            </ul>
          </section>
          <section
            data-aos="fade-up"
            className="w-full flex flex-col px-20 gap-7 mb-10"
          >
            <h2 className="text-3xl font-bold">Basically Made For You</h2>
            <ul className="w-full flex gap-5">
              {trendingPlay.map((item, index) => {
                return <MovieCard movie={item} />;
              })}
            </ul>
          </section>
          <section
            data-aos="fade-up"
            className="w-full flex flex-col px-20 gap-7 mb-10"
          >
            <h2 className="text-3xl font-bold">New Releases</h2>
            <ul className="w-full flex gap-5">
              {newPlay.map((item, index) => {
                return <MovieCard movie={item} />;
              })}
            </ul>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
}
