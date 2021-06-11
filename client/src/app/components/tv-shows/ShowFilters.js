import React from 'react'
import useFetch from '../../hooks/useFetch';
import styles from './ShowFilters.module.scss';

const ShowFilters = ({shows}) => {
  const [genreData, genreLoading, genreLoadError] = useFetch('genre/tv/list');
  
  let genres = [];
  if (!!genreData && !!genreData.genres) {
      for (let i = 0; i < genreData.genres.length; i++) {
        genres.push(<div className={styles.filterOptions} key={i}>
        <input type="checkbox" id={genreData.genres[i].name} name="genre" value={genreData.genres[i].id}/>
        <label htmlFor={genreData.genres[i].name}>{genreData.genres[i].name}</label>
        </div>)
      }
    }
    console.log(genres)
  return (
    <div>
      <h2>Filter</h2>
      <h3>By keyword</h3>
      
      <h3>By genre</h3>
        {!!genres && genres.map((genre, index) => genre)}
      <h3>By rating</h3>

      
    </div>
  )
}

export default ShowFilters
