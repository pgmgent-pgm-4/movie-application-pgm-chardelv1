import { useCallback, useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import { useFirestore } from '../../contexts/firebase/firestore.context';
import useFetch from '../../hooks/useFetch'
import styles from './MovieDetails.module.scss';

const MovieDetails = ({ id }) => {
  const [movie, isLoading, error] = useFetch(`/movie/${id}`, 'append_to_response=videos,images');
  const [credits, creditsLoading, creditsError] = useFetch(`/movie/${id}/credits`);

  const [dbMovie, setDbMovie] = useState();
  const { getMovieById } = useFirestore();
  
    const fetchData = useCallback(
      async () => {
          try {
            const data = await getMovieById((id).toString());
            setDbMovie(data);
          } catch (err) {
            console.error(err, (id).toString())
          }
        },
        [getMovieById, (id).toString()]);

    useEffect(() => {
      fetchData()
    }, [fetchData]);


  const Video = ({video}) => {
    return (
      <div className={styles.videoContainer}>
        <iframe width="100%" height="56%" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>)
  }

  return (
    <>
    {movie &&
    <div className={styles.movielistItemContainer}>
      <article className={styles.movielistItem}>
        <div className={styles.visualInfo}>
          <picture className={styles.picture}>
            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />
          </picture>
          <div className={styles.content}>
            {dbMovie && <span className={styles.rating}>{Math.round(dbMovie.avgRating / 5 * 100)}<sup>%</sup></span>}
            <h3 className={styles.title}>{ movie.title }</h3>
          </div>   
          <footer className={styles.meta}>
            {dbMovie && <span className={styles.numReviews}><VscPreview /><span>{ dbMovie.numReviews }</span></span>}
            {dbMovie && <span className={styles.numViews}><FiEye /><span>{ dbMovie.numViews }</span></span>}
          </footer>
        </div>
        <div className={styles.textInfo}>
          <h1>{movie.title}</h1>
          <h2>{movie.tagline}</h2>
          <a href={movie.homepage} title={movie.title}>{movie.title} homepage</a>
          <h2>Synopsis:</h2>
          <p>{movie.overview}</p>
          <p><span></span></p>
          {movie.videos && <Video video={movie.videos.results[0]}/>}
        </div>
      </article>
      <section className={styles.movieComments}>
        {dbMovie && dbMovie.comments}
      </section>
    </div>
    }
    {isLoading && <p>Loading...</p>}
    {error && <p>Error! {error.message}</p>}
    </>
  )
};

export default MovieDetails;