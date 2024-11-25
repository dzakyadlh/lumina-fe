import { motion } from 'motion/react';
import { Link } from 'react-router';

export function MovieCard({ movie }) {
  return (
    <motion.button whileHover={{ scale: 1.1 }} className="w-1/6 rounded-lg">
      <Link to={`/movies/${movie.id}`} />
      <img
        className="h-full rounded-lg object-cover"
        alt="movie poster"
        src={movie.imageUrl}
      />
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
      className="w-1/4 rounded-lg bg-neutral-800 border-neutral-600 border p-5"
      href="#"
    >
      <h3 className="font-semibold text-lg">{titleText}</h3>
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
        class="w-24 h-24 mb-3 rounded-full shadow-lg"
        src={profilePicture}
        alt="Profile Picture"
      />
      <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="text-sm text-gray-300 text-center">{reviewText}</p>
    </motion.div>
  );
}
