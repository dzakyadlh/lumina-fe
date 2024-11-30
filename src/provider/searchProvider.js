import { useEffect, useState } from 'react';
import { searchMoviesByTitle } from '../api/movies';

export async function useSearchProvider(title) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchByTitle = async () => {
      try {
        setIsLoading(true);
        const response = await searchMoviesByTitle(title);
        console.log(response);
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (title) {
      searchByTitle();
    }
  }, [title]);

  return {
    data,
    isLoading,
  };
}
