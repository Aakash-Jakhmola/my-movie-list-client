import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import NavBar from '../../Components/Navbar/Navbar';
import PageLoader from '../../Components/PageLoader/PageLoader';
import MovieCardContainer from './MovieCardContainer';
import WatchListCardContainer from './WatchListCardContainer';
import Followers from './Followers';
import Following from './Following';
import './Account.scss';
import { API_URL } from '../../utils/Constants';

/* 
@todo 
  after updating also update in state.
*/

export default function Account(props) {
  const { username, page } = useParams();
  const history = useHistory();
  const location = useLocation();

  console.log(page);

  const inituser = {
    username: username,
    firstname: '',
    lastname: '',
    watchedMoviesCount: 0,
    watchLaterMoviesCount: 0,
    followersCount: 0,
    followingCount: 0,
  };

  // const [movieList, setMovieList] = React.useState([]);
  const [user, setUser] = useState(inituser);
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState({});
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (!loading) setStyle({});
    else {
      setStyle({
        filter: 'blur(6px) grayscale(10%)',
        overflow: 'hidden',
      });
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/account?username=${username}`)
      .then((res) => {
        setUser(res.data[0]);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const pavitraPathName = (pathName) => {
    let newPathName = '/';
    for (let i = 1; i < pathName.length; ++i) {
      if (pathName[i] === '/') break;
      newPathName += pathName[i];
    }
    return newPathName;
  };

  const changeUrl = (p) => {
    //page = p;
    let newPath = pavitraPathName(location.pathname) + '/';
    if (p) newPath += p;
    history.replace({ pathname: newPath });
    setCurrentPage(p);
  };

  return (
    <>
      <NavBar />
      {loading && <PageLoader />}
      <div className='account' style={style}>
        <Container fluid>
          <Row>
            <Col className='text-md-left'>
              {' '}
              <h1 style={{ fontSize: '200%' }}>
                {`${user.firstname} ${user.lastname ? user.lastname : ''}`}{' '}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className='text-md-left'>
              <h5 style={{ fontSize: '100%' }}>@{user.username}</h5>
            </Col>
          </Row>
          {/* <hr style={{height:'5px', margin:'0'}}/> */}
          <Row>
            <Col
              md='3'
              className='info'
              onClick={() => {
                changeUrl('');
              }}
              style={{ borderBottom: !currentPage ? '2px solid #F9B82A' : '' }}
            >
              <div className='icon'>
                <i
                  class='fas fa-film'
                  style={{
                    color: 'rgb(50,120,250)',
                    backgroundColor: '#D6E7FF',
                  }}
                ></i>
              </div>
              <div className='info-text'>
                <span>{user.watchedMoviesCount}</span>
                <span>Movies</span>
              </div>
            </Col>
            <Col
              md='3'
              className='info'
              onClick={() => {
                changeUrl('watchlist');
              }}
              style={{
                borderBottom:
                  currentPage == 'watchlist' ? '2px solid #F9B82A' : '',
              }}
            >
              <div className='icon'>
                <i
                  class='far fa-clock'
                  style={{
                    color: 'rgb(249,141,35)',
                    backgroundColor: 'rgb(252, 225, 199)',
                  }}
                ></i>
              </div>
              <div className='info-text'>
                <span>{user.watchLaterMoviesCount}</span>
                <span>Watchlist</span>
              </div>
            </Col>
            <Col
              md='3'
              className='info'
              onClick={() => changeUrl('followers')}
              style={{
                borderBottom:
                  currentPage == 'followers' ? '2px solid #F9B82A' : '',
              }}
            >
              <div className='icon'>
                <i
                  class='fas fa-users'
                  style={{
                    color: 'rgb(87,191,99)',
                    backgroundColor: '#DAF9D4',
                  }}
                ></i>
              </div>
              <div className='info-text'>
                <span>{user.followersCount}</span>
                <span>Followers</span>
              </div>
            </Col>
            <Col
              md='3'
              className='info'
              onClick={() => changeUrl('following')}
              style={{
                borderBottom:
                  currentPage == 'following' ? '2px solid #F9B82A' : '',
              }}
            >
              <div className='icon'>
                <i
                  class='fas fa-user-friends'
                  style={{
                    color: 'rgb(133,118,195)',
                    backgroundColor: '#E4DFF1',
                  }}
                ></i>
              </div>
              <div className='info-text'>
                <span>{user.followingCount}</span>
                <span> Following</span>
              </div>
            </Col>
          </Row>
        </Container>

        <div className='account-info-wrapper'>
          {page === undefined && (
            <MovieCardContainer username={username} setLoading={setLoading} />
          )}
          {page === 'watchlist' && (
            <WatchListCardContainer
              username={username}
              setLoading={setLoading}
            />
          )}
          {page === 'followers' && <Followers />}
          {page === 'following' && <Following />}
        </div>
      </div>
    </>
  );
}
