import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './WatchListCardContainer.scss'

import { API_URL } from '../../utils/Constants'
import MovieSearchCard from '../../Components/MovieSearchCard/MovieSearchCard'

export default function WatchListCardContainer({username,setLoading}) {

  const [movieList, setMovieList] = React.useState([]);
  const [offset, setOffset] = useState(1);
  const [modalOpen, setModalOpen] = useState(false)

  function loadMovies() {
    setLoading(true)
    let url = API_URL + "/api/v2/fetch_movie_list" + "?&page_number="+offset + "&username="+username+"&watch_later=true";
    axios.get(url)
    .then((res) => {
      console.log(res.data)
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
  },[])

  return (
    <div className='watchlist-page'>
      {movieList && movieList.length>0 && !movieList[0].error  && movieList.map((movie) =>
        <MovieSearchCard 
          movie={movie.movie_details} 
          ratingModalOpen={modalOpen} 
          setRatingModalOpen={setModalOpen} 
          fromAccount={true}/>
      )}
    </div>
  )
}
