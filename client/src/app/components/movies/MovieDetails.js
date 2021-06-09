import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import useFetch from '../../hooks/useFetch'
import styles from './MovieDetails.module.scss';

const MovieDetails = ({ id }) => {
  const [movie, isLoading, error] = useFetch(`/movie/${id}`, 'append_to_response=videos,images');
  const [credits, creditsLoading, creditsError] = useFetch(`/movie/${id}/credits`);
  let writers = [];
  if (credits.crew) writers = credits.crew.filter(crewMember => crewMember.known_for_department === 'Writing').map((writer) => { 
    return {
      job: writer.job,
      name: writer.name
    }
    });

  const Video = ({video}) => {
    return (
      <div className={styles.videoContainer}>
        <iframe width="100%" height="56%" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>)
  }

  return (
    <>
    {movie && 
    <article className={styles.movielistItem}>
      <div className={styles.visualInfo}>
        <picture className={styles.picture}>
          <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />
        </picture>
        <div className={styles.content}>
          <span className={styles.rating}>{movie.vote_average}</span>
          <h3 className={styles.title}>{ movie.title }</h3>
        </div>   
        <footer className={styles.meta}>
          <span className={styles.numReviews}><VscPreview /><span>{ movie.vote_count }</span></span>
          <span className={styles.numViews}><FiEye /><span>{ Math.floor(movie.popularity) }</span></span>
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
    </article>}
    {isLoading && <p>Loading...</p>}
    {error && <p>Error! {error.message}</p>}
    {/*   <picture className={styles.picture}>
        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{movie.vote_average}</span>
        <h3 className={styles.title}>{ movie.title }</h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ movie.vote_count }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ Math.floor(movie.popularity) }</span></span>
      </footer>    */}
    </>
  )
};

export default MovieDetails;