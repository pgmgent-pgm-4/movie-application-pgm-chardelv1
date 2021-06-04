import { useEffect, useState } from 'react';
/**
 * Use Fetch
 * @param {string} endpoint
 * @param {string} queryParams
 * @returns {array} [{array} data, {boolean} isLoading, {error/null} error]
 */
const useFetch = (endpoint, queryParams = '') => {
  // If there are query params defined append them to the API URL
  let params;
  if (queryParams !== '') {
    params = `&${queryParams}`;
  }
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}${params}`;

  const getData = async () => {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, isLoading, error];
};

export default useFetch;
