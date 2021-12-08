import React, { useEffect, useState } from 'react';
import './UserMiniCard.scss';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ProfilePic from '../../assets/profile_icon.png';
import { API_URL } from '../../utils/Constants';

export default function UserMiniCard({ user_details, is_following, fromFollowingList }) {
  // console.log(props)


  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (is_following) {
      setIsFollowing(true);
    }
    console.log('from following', fromFollowingList)
  },[])

  const followUser = () => {
    axios.post(`${API_URL}/api/v2/profile/follow`, { following_username: user_details.username }, { withCredentials: true })
      .then(() => { setIsFollowing(true) })
      .catch((err) => { console.log(err) })
  }

  const unfollowUser = () => {

    axios.delete(`${API_URL}/api/v2/profile/unfollow?following_username=${user_details.username}`, { withCredentials: true })
      .then(() => { setIsFollowing(false) })
      .catch((err) => { console.log(err) })
  }

  if(fromFollowingList && isFollowing===false)
    return (<></>);

  return (
    <div className='user-mini-card'>
      <div className='profile-img'> <img src={ProfilePic} style={{ height: '3rem' }} /></div>
      <div className='user-info'>
        <Link to={`/${user_details?.username}`}>
          <span style={{ fontSize: '1.2em' }}>{user_details?.firstname} {user_details?.lastname}</span>
          <br />
          <span style={{ fontWeight: '300' }}>@{user_details?.username}</span>
        </Link>
      </div>
      <div className="umc-buttons">
        {isFollowing && <button className={'umc-btn unfollow-btn'} onClick={unfollowUser}>Unfollow</button>}
        {!isFollowing && <button className={'umc-btn follow-btn'} onClick={followUser}>Follow</button>}
      </div>
    </div>
  )
}
