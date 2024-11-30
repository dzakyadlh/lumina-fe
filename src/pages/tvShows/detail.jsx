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
import { secondsToRuntime } from '../../utils/runtimeConverter';

export default function TVShowDetailPage() {
  const { tvShow_id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchTvShowData = async () => {
      try {
        const data = await getDetailsById(tvShow_id);
        setTvShow(data);
        const reData = await getTvShowsByGenre(data.genres[0].text);
        setRecommendations(reData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTvShowData();

    AOS.init({
      duration: 1000,
      offset: 100,
    });
  }, [tvShow_id]);

  const handleAddWatchlist = async () => {
    try {
      const data = await addWatchlist(tvShow_id);
      if (data) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.log(error);
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
          src={tvShow.imageUrl}
          alt="banner poster"
          className="absolute h-screen w-full object-cover object-top top-0 right-0 z-[-10] filter brightness-50"
        />
        <div className="absolute h-full w-full bg-gradient-to-r from-black via-transparent to-transparent top-0 left-0 z-[-5]"></div>
        {showToast && (
          <div
            id="toast"
            className="fixed bottom-5 right-5 border-yellow-400 border rounded-lg p-4 bg-white dark:bg-black"
          >
            {tvShow.title} added to your watchlist!
          </div>
        )}
        <header
          data-aos="fade-right"
          className="h-screen w-2/5 flex flex-col justify-center pl-40 gap-5"
        >
          <h1 className="text-4xl font-bold">{tvShow.title}</h1>
          <p className="">{tvShow.plot}</p>
          <p className="text-subtitle">
            {tvShow.releaseYear} | {secondsToRuntime(tvShow.runtime)} |{' '}
            {tvShow.genres.map((genre) => genre.text).join(', ')}
          </p>
          <p className="">
            <span className="text-subtitle">Starring: </span>
            {tvShow.stars.split(' in')[0]}
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
        <main className="flex flex-col gap-10">
          {Array.from(
            { length: tvShow.episodes.seasons.length - 1 },
            (_, index) => (
              <section
                data-aos="fade-up"
                key={index + 1}
                className="flex flex-col gap-5 px-40"
              >
                <h2 className="text-3xl font-semibold">Season {index + 1}</h2>
                <ul className="flex flex-col">
                  {Array.from(
                    { length: tvShow.episodes.episodes.total - 1 },
                    (_, subindex) => (
                      <li
                        key={subindex + 1}
                        className="flex items-center gap-4 p-5 border-b border-default-border"
                      >
                        <div className="w-32 h-20 rounded-lg bg-subtitle"></div>
                        <div className="flex flex-col">
                          <p className="font-medium text-lg">
                            Episode {subindex + 1}
                          </p>
                          <p className="text-subtitle overflow-ellipsis">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Maiores exercitationem harum ut veritatis quae
                            debitis excepturi possimus praesentium quod ipsa.
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </section>
            )
          )}
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
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
}
