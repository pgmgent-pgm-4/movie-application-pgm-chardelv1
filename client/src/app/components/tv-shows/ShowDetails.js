import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import useFetch from '../../hooks/useFetch';
import styles from './ShowDetails.module.scss';

const ShowDetails = ({ id }) => {
  console.log(id)
  const [show, showIsLoading, showError] = useFetch(`/tv/${id}`, 'append_to_response=videos,images');
  console.log(show)
  const [credits, creditsLoading, creditsError] = useFetch(`/tv/${id}/credits`);
  const [contentRating, contentRatingLoading, contentRatingError] = useFetch(`/tv/${id}/content_ratings`);
  
  const Video = ({video}) => {
    return (
      <div className={styles.videoContainer}>
      <iframe width="100%" height="35%" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>)
  }
  return (
    <>
    {show && 
    <article className={styles.showlistItem}>
      <div className={styles.visualInfo}>
        <picture className={styles.picture}>
          <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${show.poster_path}`} alt={show.title} />
        </picture>
        <div className={styles.content}>
          <span className={styles.rating}>{show.vote_average}</span>
          <h3 className={styles.title}>{ show.title }</h3>
        </div>   
        <footer className={styles.meta}>
          <span className={styles.numReviews}><VscPreview /><span>{ show.vote_count }</span></span>
          <span className={styles.numViews}><FiEye /><span>{ Math.floor(show.popularity) }</span></span>
        </footer>
      </div>
      <div className={styles.textInfo}>
        <h1>{show.name}</h1>
        {/* <p><span className={styles.showGenres}>{genres.map(genre => genre.name).join(', ')}</span></p> */}
        <h2>{show.tagline}</h2>
        <a href={show.homepage} title={show.name}>{show.name} homepage</a>
        <h2>Synopsis:</h2>
        <p>{show.overview}</p>
        <p><span></span></p>
        {show.videos && <Video video={show.videos.results[0]}/>}
      </div>
    </article>}
    {showIsLoading && <p>Loading...</p>}
    {showError && <p>Error! {showError.message}</p>}
    </>
  )
};

export default ShowDetails;