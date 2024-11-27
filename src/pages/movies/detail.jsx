import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CircularProgress } from '@mui/material';
import { getDetailsById, getTvShowsByGenre } from '../../api/movies';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPlay } from '@fortawesome/free-solid-svg-icons';
import { MovieCard } from '../../components/movie_card';
import { addWatchlist } from '../../api/users';

export default function MovieDetailPage() {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await getDetailsById(movie_id);
        setMovie(data);
        const reData = await getTvShowsByGenre(data.genres[0].text);
        setRecommendations(reData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();

    AOS.init({
      duration: 1000,
      offset: 100,
    });
  }, [movie_id]);

  const handleAddWatchlist = async () => {
    try {
      const data = await addWatchlist(movie_id);
    } catch (error) {
      setError(error);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <React.Fragment>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col gap-10">
        <img
          src={movie.imageUrl}
          alt="banner poster"
          className="absolute h-screen w-screen object-cover top-0 left-0 z-[-10] filter brightness-50"
        />
        <div className="absolute h-full w-full bg-gradient-to-r from-black via-transparent to-transparent top-0 left-0 z-[-5]"></div>
        {showToast && (
          <div
            id="toast"
            className="fixed bottom-5 right-5 border-yellow-400 border rounded-lg p-4 bg-white dark:bg-black"
          >
            {movie.title} added to your watch list!
          </div>
        )}
        <header
          data-aos="fade-right"
          className="h-screen w-2/5 flex flex-col justify-center pl-40 gap-5"
        >
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="">{movie.plot}</p>
          <p className="text-subtitle">
            {movie.releaseYear} | {movie.runtime} |{' '}
            {movie.genres.map((genre) => genre.text).join(', ')}
          </p>
          <p className="">
            <span className="text-subtitle">Starring: </span>
            {movie.stars.split(' in')[0]}
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
              onClick={() => {
                handleAddWatchlist();
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faAdd} className="w-5 h-5 text-white" />
                Watch Later
              </div>
            </motion.button>
          </div>
        </header>
        <section
          data-aos="fade-up"
          className="w-full flex flex-col gap-7 px-40"
        >
          <h2 className="text-3xl font-semibold">More like this</h2>
          <ul className="w-full flex gap-5">
            {recommendations.map((rec, index) => (
              <MovieCard key={index} movie={rec} />
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}
