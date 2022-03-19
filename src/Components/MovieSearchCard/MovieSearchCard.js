import React, {useState, useContext,useEffect} from 'react'
import { Redirect, useLocation } from 'react-router'
import axios from 'axios'
import ReactNotification, {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import './MovieSearchCard.scss'
import RatingModal from '../RatingModal/RatingModal'
import {AuthContext} from '../../state/Store'
import { API_URL } from '../../utils/Constants'
import Notif from '../Notif/Notif'

export default function MovieSearchCard({ movie, 
    ratingModalOpen, setRatingModalOpen, fromAccount
  }) {
  
  const auth = useContext(AuthContext)
  const location = useLocation();

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [ratingError, setRatingError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const generateSuccessNotif = ()=>{
    store.addNotification({
      title: "Success",
      message: "Movie Successfully Added",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2500,
        onScreen: true
      }
    });
  }

  const generateWatchLaterSuccessNotif = ()=>{
    store.addNotification({
      title: "Success",
      message: "Successfully Added to Watch Later List",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2500,
        onScreen: true
      }
    });
  }

  const generateWatchLaterErrorNotif = ()=>{
    store.addNotification({
      title: "Error",
      message: "Cannot Add Movie",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2500,
        onScreen: true
      }
    });
  }

  function addToWatchedMovies() {
    setModalOpen(true)
  } 

  function watchLaterMovie() {
    
    let data = {movie_id:movie.id,watch_later:true}
    //console.log(movie)
    axios.post(`${API_URL}/api/v2/add_movie`,data,{withCredentials:true})
    .then((res)=>{
      console.log(res)
      if(res.data.error) {
       generateWatchLaterErrorNotif()
      }
      else {
        generateWatchLaterSuccessNotif();
      }
    })
    .catch((err)=>{
      console.log(err.response)
      generateWatchLaterErrorNotif()
    })
  }


  function submitReview() {
    if(!rating) {
      setRatingError('give some rating')
      return 
    }
    let data = {movie_id:movie.id,score:rating, review:review}
    //console.log(movie)
    axios.post(`${API_URL}/api/v2/add_movie`,data,{withCredentials:true})
    .then((res)=>{
      console.log(res)
      if(res.data.error) {
        setRatingError(res.data.error)
        //generateErrorNotif();
      }
      else {
        generateSuccessNotif();
        setRatingError('')
        setModalOpen(false)
        setRatingModalOpen(false)
      }
    })
    .catch((err)=>{
      console.log(err.response)
      //generateErrorNotif()
      //setRatingError(err.response.data.toLowerCase())
    })
  }

  if(!movie.posterUrl) 
    return <></>

  if(modalOpen && !auth.state.userLoggedIn) 
    return <Redirect to={{ pathname: "/login", state: { from: location.pathname+location.search } }}/>
  
  return (
    <>
      <ReactNotification/>
      <div className='movie-search-card'>
      <div className='poster'>
        <img src={movie.posterUrl}/>
      </div>
      <div className='info'>
        <div className='title'>{movie.title}</div>
        <div>{movie.release_date && movie.release_date.substring(0,4)} . {movie.language}</div>
        <div>{movie.genres && movie.genres.map((g)=>(<span className='genre'>{g} </span>))}</div>
        <div className='overview'>{movie.overview}</div>
        <div className='actions' style={{display:fromAccount?'none':'flex'}}>
          <div onClick={addToWatchedMovies}><i className="fas fa-check-circle fa-2x"/><span> </span></div>
          <div onClick={watchLaterMovie}><i className="fas fa-clock fa-2x"/><span></span></div>
        </div>
      </div>
    </div>
    {modalOpen && <RatingModal 
        ratingModalOpen={modalOpen} 
        setRatingModalOpen={setModalOpen}
        rating={rating}
        setRating={setRating}
        review={review}
        setReview={setReview}
        ratingError={ratingError}
        submitReview={submitReview}/>}
    </>
  )
}
