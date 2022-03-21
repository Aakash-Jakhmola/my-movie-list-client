import React, { useEffect, useState } from 'react';
import ReviewCard from '../../Components/ReviewCard/ReviewCard';
import axios from 'axios';

import { API_URL } from '../../utils/Constants';

function MovieCardContainer({ username, setLoading }) {
  const [movieList, setMovieList] = React.useState([]);
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState('time');
  const sortKey = {
    time: 'Time',
    score: 'Rating',
  };

  const toggleSort = () => {
    if (sortBy === 'time') {
      setSortBy('score');
      setOffset(0);
    } else {
      setSortBy('time');
      setOffset(0);
    }
  };

  const loadMovies = () => {
    setLoading(true);
    let clearList = offset < movieList.length;
    console.log({ offset, clearList });
    let url = `${API_URL}/movie/list?username=${username}&hasWatched=true&offset=${offset}&sortBy=${sortBy}`;

    axios
      .get(url, { withCredentials: true })
      .then(async (res) => {
        if (clearList) {
          await setMovieList([]);
          await setMovieList(res.data);
        } else {
          setMovieList([...movieList, ...res.data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMovies();
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setOffset(offset + 10);
        // Show loading spinner and make fetch request to api
      }
    });
  }, []);

  return (
    <>
      <div
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.2rem',
          marginTop: '10px',
          marginRight: '0',
          marginLeft: 'auto',
        }}
      >
        Sort By :
        <div className='sort-by-box' onClick={toggleSort}>
          {sortKey[sortBy]}
        </div>
      </div>
      <div className='movie-card-container'>
        {movieList &&
          movieList.length > 0 &&
          !movieList[0].error &&
          movieList.map((movie) => (
            <ReviewCard movie={movie} username={username} />
          ))}
      </div>
    </>
  );
}

export default MovieCardContainer;
