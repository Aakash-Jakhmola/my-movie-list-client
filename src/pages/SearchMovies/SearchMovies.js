import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { API_URL } from '../../utils/Constants';

import PageLoader from '../../Components/PageLoader/PageLoader';
import NavBar from '../../Components/Navbar/Navbar';
import MovieSearchCard from '../../Components/MovieSearchCard/MovieSearchCard';
import './SearchMovies.scss';

export default function SearchMovies(props) {
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  // const [blurred, setblurred] = useState(initialState)
  const [style, setStyle] = useState({});
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  let query = queryString.parse(props.location.search);

  useEffect(() => {
    if (loading)
      setStyle({
        filter: 'blur(6px)',
        // overflow:'hidden',
      });
    else {
      setStyle({});
    }
  }, [loading, ratingModalOpen]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/movie?search=${query.q}`)
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      {loading && <PageLoader />}
      <div className='res'>
        {movies.length} results found with '
        <b>
          <i>{query.q}</i>
        </b>
        '
      </div>
      <div className='search-movie-page' style={style}>
        {movies.map((movie) => (
          <MovieSearchCard
            key={movie.movieId}
            id={movie.movieId}
            movie={movie}
            ratingModalOpen={ratingModalOpen}
            setRatingModalOpen={setRatingModalOpen}
          />
        ))}
      </div>
      {/* {ratingModalOpen && <RatingModal 
        ratingModalOpen={ratingModalOpen} 
        setRatingModalOpen={setRatingModalOpen}/>} */}
    </>
  );
}
