import React, {useEffect, useState} from 'react'
import ReviewCard from '../../Components/ReviewCard/ReviewCard'
import axios from 'axios'

import { API_URL } from '../../utils/Constants'

function MovieCardContainer({username,setLoading}) {
  const [movieList, setMovieList] = React.useState([]);
  const [offset, setOffset] = useState(1)
  const [counter, setCounter] = useState(0)

  function loadMovies() {
    setLoading(true)
    let url = API_URL + "/api/v2/fetch_movie_list" + "?page_number="+offset + "&username="+username ;
    axios.get(url)
    .then((res) => {
      console.log('xxxxxxxxxxxx',res.data)
      setMovieList([...movieList,...res.data]);
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  }

  useEffect(()=>{
    loadMovies()
  },[offset])

  useEffect(()=>{
    window.addEventListener('scroll', function() {
      console.log('here scrolling');
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
         console.log("you're at the bottom of the page");
         setOffset(offset+10)
         // Show loading spinner and make fetch request to api
      }
   });
  },[])

  return (
    <div className='movie-card-container'>
      {movieList && movieList.length>0 && !movieList[0].error  && movieList.map((movie) =>
        <ReviewCard movie={movie} />
      )}
    </div>
  )
}

export default MovieCardContainer
