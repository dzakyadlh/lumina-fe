import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { getWatchlist, removeWatchlist } from '../../api/users';
import { CircularProgress } from '@mui/material';
import { getDetailsById } from '../../api/movies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';
import { motion } from 'motion/react';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist();
        const idList = data.liked_movie_ids;
        if (Array.isArray(idList) && idList.length > 0) {
          const movieList = [];
          for (let i = 0; i < idList.length; i++) {
            // Fetch movie details by movie ID (using idList[i])
            const movie = await getDetailsById(idList[i]);
            movieList.push(movie);
          }

          // Update the watchlist state with the movie list
          setWatchlist(movieList);
        } else {
          console.log('No liked movies found');
        }
      } catch (error) {
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
      <div className="min-h-screen w-full flex flex-col py-28 px-20">
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Your Watch List</h1>
        </header>
        <main>
          <section className="flex gap-5">
            {watchlist.length === 0 ? (
              <p className="text-xl">
                You don't have any watch list. Go and add some movies into your
                watch list!
              </p>
            ) : (
              <ul className="w-full flex gap-5">
                {watchlist.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="w-[12.5%] relative group"
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
                      className="absolute top-2 right-2 text-white hidden group-hover:block"
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
    </React.Fragment>
  );
}
