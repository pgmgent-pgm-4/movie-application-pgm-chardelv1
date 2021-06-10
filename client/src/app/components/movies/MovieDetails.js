import { useCallback, useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import { useFirestore } from '../../contexts/firebase/firestore.context';
import { CommentForm, CommentList } from '../comments';
import useFetch from '../../hooks/useFetch'
import styles from './MovieDetails.module.scss';

const MovieDetails = ({ id }) => {
  const [movie, isLoading, error] = useFetch(`/movie/${id}`, 'append_to_response=videos,images');
  const [credits, creditsLoading, creditsError] = useFetch(`/movie/${id}/credits`);

  const [dbMovie, setDbMovie] = useState();
  const [movieComments, setMovieComments] = useState();
  const [movieReviews, setMovieReviews] = useState();
  const { getMovieById, getMovieComments, getMovieReviews } = useFirestore();
  
    const fetchData = useCallback(
      async () => {
          try {
            const movieData = await getMovieById((id).toString());
            setDbMovie(movieData);
            const commentData = await getMovieComments((id).toString());
            setMovieComments(commentData);
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
    <div className={styles.movie}>
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
            {movie.videos && <Video video={movie.videos.results[0]}/>}
          </div>
        </article>
        <CommentForm subjectId={id} subjectType='movies' />
        <CommentList key={id} comments={movieComments} subjectType='movies' subjectId={id} />
      </div>
      }
      {isLoading && <p>Loading...</p>}
      {error && <p>Error! {error.message}</p>}
    </div>
  )
};

export default MovieDetails;