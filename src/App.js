import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Landing from './pages/landing';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import HomePage from './pages/home';
import TVShowsPage from './pages/tvShows';
import MoviesPage from './pages/movies';
import MovieDetailPage from './pages/movies/detail';
import TVShowDetailPage from './pages/tvShows/detail';
import WatchlistPage from './pages/watchlist';
import FreeToWatchPage from './pages/freeToWatch';
import SearchPage from './pages/search';
import TestPage from './pages/test/test';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to={'/landing'} />;
  }
  return children;
};

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    return <Navigate to={'/'} />;
  }
  return children;
};

function App() {
  return (
    <React.Fragment>
      <Routes>
        {/* Public Routes */}
        <Route
          path="landing"
          element={
            <RedirectIfAuthenticated>
              <Landing />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="signin"
          element={
            <RedirectIfAuthenticated>
              <SignInPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="signup"
          element={
            <RedirectIfAuthenticated>
              <SignUpPage />
            </RedirectIfAuthenticated>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tvShows"
          element={
            <ProtectedRoute>
              <TVShowsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="movies"
          element={
            <ProtectedRoute>
              <MoviesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="movies/:movie_id"
          element={
            <ProtectedRoute>
              <MovieDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tvShows/:tvShow_id"
          element={
            <ProtectedRoute>
              <TVShowDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="watchlist"
          element={
            <ProtectedRoute>
              <WatchlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="freeToWatch"
          element={
            <ProtectedRoute>
              <FreeToWatchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="search/:title"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="test"
          element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
