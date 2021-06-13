import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { useFirestore } from '../../contexts/firebase/firestore.context';

import useFetch from '../../hooks/useFetch';
import * as Routes from '../../routes';
import { useAuth } from '../../contexts/firebase/auth.context';
import styles from './ShowDetails.module.scss';
import { CommentForm, CommentList } from '../comments';
import { ReviewForm, ReviewList } from '../reviews';

const ShowDetails = ({ id }) => {
  const {currentUser} = useAuth();
  const [show, showIsLoading, showError] = useFetch(`/tv/${id}`, 'append_to_response=videos,images');
  const [credits, creditsLoading, creditsError] = useFetch(`/tv/${id}/credits`);
  const [altTitles, altTitlesLoading, altTitlesError] = useFetch(`tv/${id}/alternative_titles`);
  const [keywords, keywordsLoading, keywordsError] = useFetch(`tv/${id}/keywords`);
  const [recommendations, recommendationsLoading, recommendationsError] = useFetch(`tv/${id}/similar`);
  const [watchProviders, watchProvidersLoading, watchProvidersError] = useFetch(`tv/${id}/watch/providers`);

  const [tvShow, setTvShow] = useState();
  const [tvShowComments, setTvShowComments] = useState();
  const [tvShowReviews, setTvShowReviews] = useState();
  const [showAddReview, setShowAddReview] = useState(false);
  console.log(credits)

  const handleShowAddReview = (e) => {
    setShowAddReview(!showAddReview);
  }

  const { getTvShowById, getTvShowComments, getTvShowReviews } = useFirestore();
    
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
        <iframe width="560" height="349" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
            <span className={styles.rating}>{show.vote_average*10}<sup>%</sup></span>
            <h3 className={styles.title}>{ show.title }</h3>
          </div>   
          <footer className={styles.meta}>
            <span className={styles.numReviews}><VscPreview /><span>{ show.vote_count }</span></span>
            <span className={styles.numViews}><FiEye /><span>{ Math.floor(show.popularity) }</span></span>
          </footer>
          {show.videos && <Video video={show.videos.results[0]}/>}
        </div>
        <div className={styles.textInfo}>
          <h1>{show.name}</h1>
          <ul className={styles.tagsList}>
            {!!keywords && !!keywords.results && keywords.results.map(keyword => <li className={styles.tag} key={keyword.id}>{keyword.name}</li>)}
          </ul>
          <h2>{show.tagline}</h2>
          <a href={show.homepage} title={show.name}>{show.name} homepage</a>
          {!!watchProviders & !!watchProviders.results && watchProviders.results.BE && watchProviders.results.BE.flatrate && <div className={styles.watch}><p>Watch: </p> <a href={watchProviders.results.BE.link}><img className={styles.providerLogo} src={`https://www.themoviedb.org/t/p/original${watchProviders.results.BE.flatrate[0].logo_path}`} alt={watchProviders.results.BE.flatrate[0].provider_name}/></a></div>}
          <h2>Synopsis:</h2>
          <p>{show.overview}</p>
        </div>
      </article>}
      <h3 className={styles.recommendationsTitle}>If you liked <em>{show.name}</em>, look out for these TV shows</h3>
      <div className={styles.recommendedMoviesList}>
          {!!recommendations && !!recommendations.results && 
            recommendations.results.map(
              rec => 
                <Link to={Routes.MOVIE_DETAILS.replace(':id', rec.id)}>
                  <img className={styles.movieImg} src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${rec.poster_path}`} key={rec.id} alt={rec.title} />
                </Link> 
              )}
        </div>
      {!!currentUser && 
      <div className={styles.review}>
        <img className={styles.user__avatar} src={`https://robohash.org/${currentUser.id}?gravatar=hashed`} alt='User avatar'/>
        <button className={styles.leaveReviewButton} onClick={handleShowAddReview}>Add a review</button>
        {!!showAddReview && <ReviewForm subjectId={id} subjectType='tv' />}
      </div>}
        <ReviewList reviews={tvShowReviews} amount={3}/>
      <CommentForm subjectId={id} subjectType='tv' />
      <CommentList key={id} comments={tvShowComments} subjectType='tv' subjectId={id} amount={3}/>
      {showIsLoading && <p>Loading...</p>}
      {showError && <p>Error! {showError.message}</p>}
    </div>
  )
};

export default ShowDetails;