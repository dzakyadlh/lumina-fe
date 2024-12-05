import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import Footer from '../../components/footer';
import { ErrorAlert } from '../../components/alerts';
import { getWatchlist, removeWatchlist } from '../../firebase/user';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist();
        setWatchlist(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemoveWatchlist = async (id) => {
    try {
      setIsLoading(true);
      const data = await removeWatchlist(id);
      if (data) {
        setWatchlist((prevWatchlist) =>
          prevWatchlist.filter((movie) => movie.movie_id !== id)
        );
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
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
      <div className="min-h-screen w-full flex flex-col pt-24 pb-5 md:py-28 px-5 md:px-10 xl:px-20">
        <header className="mb-5 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-bold">Your Watchlist</h1>
        </header>
        <main>
          <section className="flex gap-5">
            {watchlist.length === 0 ? (
              <p className="sm:text-xl">
                You don't have any watch list. Go and add some movies into your
                watch list!
              </p>
            ) : (
              <ul className="w-full flex flex-wrap gap-5">
                {watchlist.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-[25vw] sm:w-[15vw] xl:w-[12.5%] rounded-lg relative group"
                  >
                    <motion.button className="w-full h-full rounded-lg">
                      {item.is_series === false ? (
                        <Link to={`/movies/${item.movie_id}`}>
                          <img
                            className="h-full rounded-lg object-cover"
                            alt={`${item.title} (${item.releaseYear})`}
                            src={item.imageUrl}
                          />
                        </Link>
                      ) : (
                        <Link to={`/tvShows/${item.movie_id}`}>
                          <img
                            className="h-full rounded-lg object-cover"
                            alt={`${item.title} (${item.releaseYear})`}
                            src={item.imageUrl}
                          />
                        </Link>
                      )}
                    </motion.button>
                    <button
                      onClick={() => handleRemoveWatchlist(item.movie_id)}
                      className="absolute top-2 right-2 text-yellow-500 hidden group-hover:block"
                      title="Remove from Watchlist"
                    >
                      <FontAwesomeIcon icon={faClose} className="text-xl" />
                    </button>
                  </motion.div>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
      {error && <ErrorAlert alertText={error} />}
      <Footer />
    </React.Fragment>
  );
}
