import React, { useEffect, useState } from 'react';

const useFetch = (endpoint, queryParams) => {
  if (!!queryParams) {
    queryParams = `&${queryParams}`;
  } else {
    queryParams = '';
  }
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  console.log(process.env.REACT_APP_TMDB_API_KEY)
  const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}${queryParams}`

  console.log(apiUrl)

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
  }, []);

  return [data, isLoading, error];
}

export default useFetch;