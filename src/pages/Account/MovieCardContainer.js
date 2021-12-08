import React, { useEffect, useState } from 'react'
import ReviewCard from '../../Components/ReviewCard/ReviewCard'
import axios from 'axios'

import { API_URL } from '../../utils/Constants'

function MovieCardContainer({ username, setLoading }) {
  const [movieList, setMovieList] = React.useState([]);
  const [offset, setOffset] = useState(1)
  const [counter, setCounter] = useState(0)
  const [sortBy, setSortBy] = useState('_id')
  const sortKey = {
    _id: 'Time',
    score: 'Rating'
  }

  const toggleSort = () => {
    if(sortBy === '_id') {
      setSortBy('score');
    } else {
      setSortBy('_id');
    }
  }

  const loadMovies = (clearList = false) => {
    setLoading(true)
    let url = API_URL + "/api/v2/fetch_movie_list" + "?&page_number=" + offset + "&username=" + username + "&sort_key=" + sortBy;
    axios.get(url)
      .then(async (res) => {
        console.log(res.data)
        if (clearList) {
          await setMovieList([]);
          await setMovieList(res.data);
        } else {
          setMovieList([...movieList, ...res.data]);
        }
        setLoading(false);
        console.log(movieList);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMovies(true)
  }, [sortBy])

  useEffect(() => {
    loadMovies()
  }, [offset])

  useEffect(() => {
    window.addEventListener('scroll', function () {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setOffset(offset + 10)
        // Show loading spinner and make fetch request to api
      }
    });
  }, [])

  return (
    <>
      <div  style={{width:'fit-content',display:'flex', alignItems:'center', fontSize: '1.2rem', marginTop:'10px', marginRight:'0', marginLeft:'auto'}}>
        Sort By :
        <div className="sort-by-box" onClick={toggleSort}>{sortKey[sortBy]}</div>
      </div>
      <div className='movie-card-container'>
        {movieList && movieList.length > 0 && !movieList[0].error && movieList.map((movie) =>
          <ReviewCard movie={movie} username={username} />
        )}
      </div>
    </>
  )
}

export default MovieCardContainer
