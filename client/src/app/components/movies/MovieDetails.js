import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import useFetch from '../../hooks/useFetch'
import styles from './MovieDetails.module.scss';

const MovieDetails = ({ id }) => {
  const [movie, isLoading, error] = useFetch(`/movie/${id}`);
  const [credits, creditsLoading, creditsError] = useFetch(`/movie/${id}/credits`);
  let writers = [];
  if (credits.crew) writers = credits.crew.filter(crewMember => crewMember.known_for_department === 'Writing').map((writer) => { 
    return {
      job: writer.job,
      name: writer.name
    }
    });
  const mergedWriters = Array.reduce((acc, obj) => {
    if (acc[obj.name]) {
      acc[obj.name].value = acc[obj.name].value.isArray ?
      acc[obj.name].value.concat(obj.value) :
      [acc[obj.name].value].concat(obj.value);
    } else {
      acc[obj.name] = obj;
    }
    return acc;
  }, {});
  let outputWriters = [];
  for (let prop in mergedWriters) {
    outputWriters.push(mergedWriters[prop])
  }
  
  console.log(movie)
  console.log(credits)
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

      </div>
    </article>}
    {isLoading && <p>Loading...</p>}
    {error && <p>Error! {error}</p>}
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