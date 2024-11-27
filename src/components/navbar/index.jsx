import React, { useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Link, useNavigate } from 'react-router';

export default function Navbar({ page = '' }) {
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        controls.start({ backgroundColor: 'black' });
      } else {
        controls.start({ backgroundColor: 'transparent' });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  if (page === 'landing') {
    return (
      <motion.nav
        animate={controls}
        initial={{ backgroundColor: 'transparent' }}
        className="fixed z-10 flex px-10 py-5 justify-between w-full duration-300"
      >
        <a
          className="font-semibold text-2xl py-2 hover:text-yellow-200 transition duration-300"
          href="/landing"
        >
          Lumina
        </a>
        <div>
          <motion.button
            whileHover={{
              backgroundColor: '#fef08a',
              transition: { duration: 0.3 },
            }}
            className="px-5 py-2 bg-white rounded-full text-black font-semibold"
            onClick={() => {
              navigate('/signin');
            }}
          >
            Sign In
          </motion.button>
        </div>
      </motion.nav>
    );
  } else {
    return (
      <nav className="fixed z-10 flex px-10 py-5 justify-between bg-black w-full">
        <ul className="flex items-center gap-10">
          <motion.li
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Link
              className="font-semibold text-2xl py-2 hover:text-yellow-200 transition duration-300 mr-5"
              to={'/'}
            >
              Lumina
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.05,
              color: '#fef08a',
              transition: { duration: 0.3 },
            }}
          >
            <Link className="" to={'/tvShows'}>
              TV Shows
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.05,
              color: '#fef08a',
              transition: { duration: 0.3 },
            }}
          >
            <Link className="" to={'/movies'}>
              Movies
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.05,
              color: '#fef08a',
              transition: { duration: 0.3 },
            }}
          >
            <Link className="" to={'/freeToWatch'}>
              Free to Watch
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.05,
              color: '#fef08a',
              transition: { duration: 0.3 },
            }}
          >
            <Link className="" to={'/watchList'}>
              Watchlist
            </Link>
          </motion.li>
        </ul>
        <div>
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            className="px-2 py-2 bg-transparent rounded-full text-black font-semibold"
            onClick={() => {
              navigate('/signin');
            }}
          >
            <svg
              className="w-5 h-5 text-black dark:text-white hover:text-yellow-200 transition duration-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </motion.button>
        </div>
      </nav>
    );
  }
}
