import { useEffect, useState } from 'react';
/**
 * Use Fetch
 * @param {string} endpoint 
 * @param {string} queryParams 
 * @returns {array} [{array} data, {boolean} isLoading, {error/null} error]
 */
const useFetch = (endpoint, queryParams = '') => {
  // If there are query params defined append them to the API URL
  if (queryParams !== '') {
    queryParams = `&${queryParams}`;
  }
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}${queryParams}`

  const getData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, isLoading, error];
}

export default useFetch;