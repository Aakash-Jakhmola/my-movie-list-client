import React, { useState, useContext } from 'react';
import './ReviewCard.scss';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import { AuthContext } from '../../state/Store';
import { API_URL } from '../../utils/Constants';
import DeleteModal from '../DeleteModal/DeleteModal';
import RatingModal from '../RatingModal/RatingModal';
import MovieDetailsModal from '../MovieDetailsModal/MovieDetailsModal';

function ReviewCard({ movie, username }) {
  const auth = useContext(AuthContext);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rating, setRating] = useState(movie.score);
  const [review, setReview] = useState(movie.review);
  const [ratingError, setRatingError] = useState('');
  const [movieLocal, setMovieLocal] = useState(movie);

  React.useEffect(() => {
    console.log(auth.state.username);
  }, []);

  const generateUpdateSuccessNotif = () => {
    store.addNotification({
      title: 'Success',
      message: 'Review Successfully Updated',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

  const generatDeleteSuccessNotif = () => {
    store.addNotification({
      title: 'Success',
      message: 'Movie Successfully Deleted',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

  function deleteMovie() {
    axios
      .delete(`${API_URL}/movie/${movie.movieId}/remove?hasWatched=true`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        //generatDeleteSuccessNotif()
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function updateReview() {
    if (!rating) {
      setRatingError('give some rating');
      return;
    }
    console.log(movie);
    let data = {
      score: rating,
      review: review,
    };
    axios
      .put(`${API_URL}/movie/${movie.movieId}/edit  `, data, {
        withCredentials: true,
      })
      .then((res) => {
        setRatingError('');
        setUpdateModalOpen(false);
        setMovieLocal(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        setRatingError(err.response.data.toLowerCase());
      });
  }
  return (
    <>
      <ReactNotification />
      <div className='movie-review-card'>
        <img src={movie?.posterUrl} />
        <div className='body'>
          <div className='title'>{movie?.title}</div>
          <div className='review'>{movieLocal.review}</div>
          <div className='card-footer'>
            <div
              className='update'
              style={{
                display: auth.state.username === username ? 'block' : 'none',
              }}>
              <i
                className='far fa-edit'
                onClick={() => setUpdateModalOpen(true)}
              />
              <i
                className='far fa-trash-alt'
                onClick={() => setDeleteModalOpen(true)}
              />
            </div>
            <div className='stars'>
              <ReactStars
                count={5}
                size={18}
                value={movieLocal.score / 2}
                activeColor='#ffd700'
                isHalf={true}
                edit={false}
              />
            </div>
          </div>
        </div>
      </div>

      {updateModalOpen && (
        <RatingModal
          ratingModalOpen={updateModalOpen}
          setRatingModalOpen={setUpdateModalOpen}
          rating={rating / 2}
          setRating={setRating}
          review={review}
          setReview={setReview}
          ratingError={ratingError}
          submitReview={updateReview}
        />
      )}

      {deleteModalOpen && (
        <DeleteModal
          message='Do you want to delete this movie?'
          setDeleteModalOpen={setDeleteModalOpen}
          deleteMovie={deleteMovie}
        />
      )}
    </>
  );
}

export default ReviewCard;
