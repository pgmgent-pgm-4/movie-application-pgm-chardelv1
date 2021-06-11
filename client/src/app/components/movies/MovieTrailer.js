import React from 'react'
import useFetch from '../../hooks/useFetch';
import styles from './MovieTrailer.module.scss';

const MovieTrailer = ({id}) => {
  const [movie, isLoading, error] = useFetch(`/movie/${id}`, '&append_to_response=videos,images');
  
  const Video = ({video}) => {
    return (
      <div className={styles.videoContainer}>
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    )
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!!movie && !!movie.videos && movie.videos.results.length > 0 && <Video video={movie.videos.results[0]}/>}
      {!movie.videos && <p>No video</p>}
      {error && <p>Error: Movie not found. {error.message}</p>}
    </>
  )
  
}

export default MovieTrailer
