import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import { useFirestore } from '../../contexts/firebase/firestore.context';
import * as Routes from '../../routes';
import { useAuth } from '../../contexts/firebase/auth.context';
import { CommentForm, CommentList } from '../comments';
import { ReviewForm, ReviewList } from '../reviews';
import useFetch from '../../hooks/useFetch'
import styles from './MovieDetails.module.scss';

const MovieDetails = ({ id }) => {
  const {currentUser} = useAuth();
  const [movie, isLoading, error] = useFetch(`/movie/${id}`, 'append_to_response=videos,images');
  const [credits, creditsLoading, creditsError] = useFetch(`/movie/${id}/credits`);
  const [altTitles, altTitlesLoading, altTitlesError] = useFetch(`movie/${id}/alternative_titles`);
  const [keywords, keywordsLoading, keywordsError] = useFetch(`movie/${id}/keywords`);
  const [recommendations, recommendationsLoading, recommendationsError] = useFetch(`movie/${id}/recommendations`);
  const [watchProviders, watchProvidersLoading, watchProvidersError] = useFetch(`movie/${id}/watch/providers`);

  const [showAddReview, setShowAddReview] = useState(false);
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
            const reviewData = await getMovieReviews((id).toString());
            setMovieReviews(reviewData);
          } catch (err) {
            console.error(err, (id).toString())
          }
        },
        [getMovieById, (id).toString()]);

    useEffect(() => {
      fetchData()
    }, [fetchData]);

  const handleShowAddReview = (e) => {
    setShowAddReview(!showAddReview);
  }
  console.log(credits)
  console.log(movie)

  const Video = ({video}) => {
    return (
      <div className={styles.videoContainer}>
        <iframe width="560" height="349" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
              {<span className={styles.rating}>{movie.vote_average * 10}<sup>%</sup></span>}
              <h3 className={styles.title}>{ movie.title }</h3>
            </div>   
            <footer className={styles.meta}>
              {dbMovie && <span className={styles.numReviews}><VscPreview /><span>{ dbMovie.numReviews }</span></span>}
              {dbMovie && <span className={styles.numViews}><FiEye /><span>{ dbMovie.numViews }</span></span>}
            </footer>
            {movie.videos && <Video video={movie.videos.results[0]}/>}
          </div>
          <div className={styles.textInfo}>
            <h1>{movie.title}</h1>
            <ul className={styles.tagsList}>
              {!!keywords && !!keywords.keywords && keywords.keywords.map(keyword => <li className={styles.tag} key={keyword.id}>{keyword.name}</li>)}
            </ul>
            <h2>{movie.tagline}</h2>
            <a href={movie.homepage} title={movie.title}>{movie.title} homepage</a>
            {!!watchProviders & !!watchProviders.results && watchProviders.results.BE && watchProviders.results.BE.flatrate && <div className={styles.watch}><p>Watch: </p> <a href={watchProviders.results.BE.link}><img className={styles.providerLogo} src={`https://www.themoviedb.org/t/p/original${watchProviders.results.BE.flatrate[0].logo_path}`} alt={watchProviders.results.BE.flatrate[0].provider_name}/></a></div>}
            <h2>Synopsis:</h2>
            <p>{movie.overview}</p>
            
          </div>
        </article>
        <h3 className={styles.recommendationsTitle}>If you liked <em>{movie.title}</em>, look out for these movies</h3>
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
          {showAddReview && <ReviewForm subjectId={id} subjectType='movie' />}
        </div>
        }
        <ReviewList reviews={movieReviews} amount={3}/>
        <h3>Comments</h3>
        <CommentForm subjectId={id} subjectType='movies' />
        <CommentList key={id} comments={movieComments} subjectType='movies' subjectId={id} amount={3}/>
        
      </div>
      }
      {isLoading && <p>Loading...</p>}
      {error && <p>Error! {error.message}</p>}
    </div>
  )
};

export default MovieDetails;