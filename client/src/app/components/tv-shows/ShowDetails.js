import { useCallback, useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { useFirestore } from '../../contexts/firebase/firestore.context';

import useFetch from '../../hooks/useFetch';
import styles from './ShowDetails.module.scss';
import { CommentForm, CommentList } from '../comments';

const ShowDetails = ({ id }) => {
  const [show, showIsLoading, showError] = useFetch(`/tv/${id}`, 'append_to_response=videos,images');

  const [tvShow, setTvShow] = useState();
  const [tvShowComments, setTvShowComments] = useState();
  const [tvShowReviews, setTvShowReviews] = useState();

  const { getTvShowById, getTvShowComments, getTvShowReviews } = useFirestore();
    //console.log(show.id)
    
  const fetchData = useCallback(
    async () => {
      try {
        const tvShowData = await getTvShowById((id).toString());
        setTvShow(tvShowData);
        const commentsData = await getTvShowComments((id).toString());
        setTvShowComments(commentsData);
        const showReviews = await getTvShowReviews((id).toString());
        setTvShowReviews(showReviews);
      } catch (err) {
        console.error(err, (id).toString())
      }
    },
    [getTvShowById, getTvShowComments, getTvShowReviews, (id).toString()]
  );

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const Video = ({video}) => {
    return (
      <div className={styles.videoContainer}>
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>)
  }
  return (
    <div className={styles.tvShow}>
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
          <h2>{show.tagline}</h2>
          <a href={show.homepage} title={show.name}>{show.name} homepage</a>
          <h2>Synopsis:</h2>
          <p>{show.overview}</p>
          {show.videos && <Video video={show.videos.results[0]}/>}
        </div>
      </article>}
      <CommentForm subjectId={id} subjectType='tv' />
      <CommentList key={id} comments={tvShowComments} subjectType='tv' subjectId={id} amount={3}/>
      {showIsLoading && <p>Loading...</p>}
      {showError && <p>Error! {showError.message}</p>}
    </div>
  )
};

export default ShowDetails;