import React, { useEffect, useState } from 'react';
import './UserMiniCard.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProfilePic from '../../assets/profile_icon.png';
import { API_URL } from '../../utils/Constants';

export default function UserMiniCard({ userData }) {
  const [isFollowing, setIsFollowing] = useState(userData?.isViewerFollowing);

  useEffect(() => {}, []);

  const followUser = () => {
    axios
      .post(
        `${API_URL}/account/follow`,
        { following: userData.username },
        { withCredentials: true },
      )
      .then(() => {
        setIsFollowing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollowUser = () => {
    axios
      .delete(`${API_URL}/account/unfollow?following=${userData.username}`, {
        withCredentials: true,
      })
      .then(() => {
        setIsFollowing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='user-mini-card'>
      <div className='profile-img'>
        {' '}
        <img src={ProfilePic} style={{ height: '3rem' }} />
      </div>
      <div className='user-info'>
        <Link to={`/${userData?.username}`}>
          <span style={{ fontSize: '1.2em' }}>
            {userData?.firstname} {userData?.lastname}
          </span>
          <br />
          <span style={{ fontWeight: '300' }}>@{userData?.username}</span>
        </Link>
      </div>
      <div className='umc-buttons'>
        {isFollowing && (
          <button className={'umc-btn unfollow-btn'} onClick={unfollowUser}>
            Unfollow
          </button>
        )}
        {!isFollowing && (
          <button className={'umc-btn follow-btn'} onClick={followUser}>
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
