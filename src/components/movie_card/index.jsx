import { motion } from 'motion/react';
import { Link } from 'react-router';

export function MovieCard({ movie }) {
  return (
    <motion.button className="max-lg:flex-shrink-0 w-[25vw] sm:w-[15vw] lg:w-[12.5%] rounded-lg border border-neutral-700 overflow-clip">
      {movie.is_series === false ? (
        <Link to={`/movies/${movie.movie_id}`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            draggable="false"
            className="h-full rounded-lg object-cover"
            alt={`${movie.title} (${movie.releaseYear})`}
            src={movie.imageUrl}
          />
        </Link>
      ) : (
        <Link to={`/tvShows/${movie.movie_id}`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            draggable="false"
            className="h-full rounded-lg object-cover"
            alt={`${movie.title} (${movie.releaseYear})`}
            src={movie.imageUrl}
          />
        </Link>
      )}
    </motion.button>
  );
}

export function FeatureCard({ titleText, bodyText = '' }) {
  return (
    <motion.div
      whileHover={{
        borderColor: '#FACC15',
        backgroundColor: 'transparent',
        transition: { duration: 2 },
      }}
      className="w-2/5 md:w-1/4 rounded-lg bg-neutral-800 border-neutral-600 border p-5"
      href="#"
    >
      <h3 className="font-semibold md:text-lg">{titleText}</h3>
      <p className="text-sm">{bodyText}</p>
    </motion.div>
  );
}

export function ReviewCard({ profilePicture, name, reviewText }) {
  return (
    <motion.div
      whileHover={{
        borderColor: '#FACC15',
        backgroundColor: 'transparent',
        transition: { duration: 2 },
      }}
      className="flex flex-col items-center bg-neutral-800 rounded-lg p-5 border-neutral-600 border"
    >
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg"
        src={profilePicture}
        alt="Profile Picture"
      />
      <h5 className="mb-2 text-xl font-medium text-white">{name}</h5>
      <p className="text-sm text-gray-300 text-center">{reviewText}</p>
    </motion.div>
  );
}
