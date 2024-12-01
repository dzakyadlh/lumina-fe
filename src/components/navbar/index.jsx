import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSearch,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../../api/auth';

export default function Navbar({ page = '' }) {
  const navigate = useNavigate();
  const controls = useAnimation();

  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;

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

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const handleSignout = async () => {
    try {
      const data = await signOut();
      if (data) {
        navigate('/landing');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    const username = JSON.parse(localStorage.getItem('user')).username;
    return (
      <nav className="fixed z-10 flex items-center px-10 py-5 bg-black w-full">
        <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
          <Link
            className="font-semibold text-2xl py-2 hover:text-yellow-200 transition duration-300 mr-16"
            to={'/'}
          >
            Lumina
          </Link>
        </motion.div>
        <ul className="max-md:hidden flex items-center gap-10 flex-grow">
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
        <div className="max-md:hidden flex items-center gap-5">
          {showSearch && (
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, x: 110 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 110 }}
              className="fixed top-5 right-36"
            >
              <input
                type="text"
                name="search"
                className="border border-black dark:border-white focus:border-yellow-200 outline-none rounded-full px-4 py-2 w-64 bg-black text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </motion.form>
          )}
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            className="px-2 py-2 bg-transparent rounded-full text-black font-semibold"
            onClick={toggleSearch}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-lg dark:text-white hover:text-yellow-200"
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="p-2 rounded-lg bg-neutral-600"
            onClick={toggleProfileDropdown}
          >
            <FontAwesomeIcon icon={faUser} className="text-lg" />
          </motion.button>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-16 right-10 bg-white dark:bg-black flex flex-col gap-5 py-5 border-yellow-200 border rounded-lg"
            >
              <div className="flex items-center gap-4 px-5 pb-5 border-b border-yellow-200 pr-10">
                <div className="w-10 h-10 rounded-full bg-black dark:bg-white"></div>
                <p className="font-bold text-xl">{username}</p>
              </div>
              <div className="px-5 flex flex-col items-start gap-2">
                <motion.button whileHover={{ color: '#fef08a' }}>
                  <Link to={'/profile'} className="font-semibold">
                    Profile
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ color: '#fef08a' }}
                  onClick={handleSignout}
                  className="font-semibold"
                >
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
        <button
          className="md:hidden text-white text-xl ml-auto"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
        </button>
        {showMobileMenu && (
          <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-start gap-5 px-10 py-5 lg:hidden">
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, x: 110 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 110 }}
              className="flex items-center gap-5 mb-5"
            >
              <input
                type="text"
                name="search"
                className="border border-black dark:border-white focus:border-yellow-200 outline-none rounded-full px-4 py-2 w-64 bg-black text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" onClick={handleSearchSubmit}>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-lg dark:text-white hover:text-yellow-200"
                />
              </button>
            </motion.form>
            <Link to="/tvShows" className="hover:text-yellow-200">
              TV Shows
            </Link>
            <Link to="/movies" className="hover:text-yellow-200">
              Movies
            </Link>
            <Link to="/freeToWatch" className="hover:text-yellow-200">
              Free to Watch
            </Link>
            <Link to="/watchlist" className="hover:text-yellow-200">
              Watchlist
            </Link>
            <Link to="/profile" className="hover:text-yellow-200">
              Profile
            </Link>
            <button className="hover:text-yellow-200" onClick={handleSignout}>
              Sign Out
            </button>
          </div>
        )}
      </nav>
    );
  }
}
