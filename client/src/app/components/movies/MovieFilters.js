import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import styles from './MovieFilters.module.scss';

const MovieFilters = ({onFiltersChange}) => {
  const [genreData, genreLoading, genreLoadError] = useFetch('genre/movie/list');
  const [keywordQuery, setKeywordQuery] = useState('');
  const [genreIds, setGenreIds] = useState();
  // const [ratingValues, setRatingValues] = useState();

  let genres = [];
  if (!!genreData && !!genreData.genres) {
    for (let i = 0; i < genreData.genres.length; i++) {
      genres.push(<div className={styles.filterOptions} key={i}>
      <input type="checkbox" id={genreData.genres[i].name} name="genre" value={genreData.genres[i].id}/>
      <label htmlFor={genreData.genres[i].name}>{genreData.genres[i].name}</label>
      </div>)
    }
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let formHasGenres = false;
    let formHasKeywordQuery = false;
    for (let entry of data) {
      const [key, ] = entry;
      if (key == 'genre') formHasGenres = true;
      if (key == 'searchKeyword') formHasKeywordQuery = true;
    }
    
    if (!!formHasGenres) { 
      setGenreIds(data.getAll('genre'))
    } else {
      setGenreIds();
    }

    if (!!formHasKeywordQuery) {
      setKeywordQuery(data.getAll('searchKeyword'))
    } else {
      setKeywordQuery('');
    }
    getFilterString();
  };

  const getFilterString = (keywordQuery, genreIds) => {
    const filterObj = {
      query: keywordQuery,
      genres: genreIds
    }
    return filterObj;
  }

  useEffect(() => {
    if (typeof onFiltersChange === 'function') {
      let filters = getFilterString(keywordQuery, genreIds);
      onFiltersChange(filters)
    }
  }, [genreIds, keywordQuery]);

  return (
    <form name="filtersForm" onSubmit={handleApplyFilters}>
      <h2>Filter</h2>
      <h3>By search term</h3>
        <input type="search" name="searchKeyword" placeholder="Search for a movie..."></input>
        <button type="submit" className="applyFilterButton" key="button1">Apply Filters</button>
      <h3>By genre</h3>
        {!!genres && genres.map((genre, index) => genre)}
      {/* <h3>By rating</h3> */}

    </form>
  )
}

export default MovieFilters