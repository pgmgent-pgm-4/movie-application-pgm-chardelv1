import { useEffect, useState } from 'react';
import { appConfig } from '../config';
/**
 * Use Fetch
 * @param {string} endpoint
 * @param {string} queryParams
 * @returns {array} [{array} data, {boolean} isLoading, {error/null} error]
 */
const useFetch = (endpoint, queryParams = '') => {
  // If there are query params defined append them to the API URL
  let params = '';
  if (queryParams !== '') {
    params = `&${queryParams}`;
  }
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${appConfig.tmdbApiKey}${params}`;
  console.log(apiUrl)
  const searchUrl = "https://api.themoviedb.org/3/search/multi?api_key=77a730ff683e532669abfe709209746d&language=en-US&query=zoo&page=1&include_adult=false"

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
  }, []);

  return [data, isLoading, error];
};

export default useFetch;
