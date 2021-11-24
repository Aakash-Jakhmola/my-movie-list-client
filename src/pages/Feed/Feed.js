import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios'

import './Feed.scss'
import ProfilePic from '../../assets/profile_icon.png'
import {API_URL} from '../../utils/Constants'
import NavBar from '../../Components/Navbar/Navbar'
import {AuthContext} from '../../state/Store'
import FeedCard from '../../Components/FeedCard/FeedCard'
import { Link, NavLink } from 'react-router-dom'

function Feed() {
  const auth = useContext(AuthContext)

  const inituser = {
    username : auth.state.username,
    firstname : "",
    lastname : "",
    movies_count : 0,
    followers_count: 0,
    following_count:0,
    watch_later_count:0,
  }

  const [user, setUser] = useState(inituser)
  const [feeds, setFeeds] = useState([])

  useState(()=>{
    console.log(auth)
    axios.get(`${API_URL}/api/v2/users/feed`,{withCredentials:true})
    .then((res)=>{
      console.log(res.data)
      setFeeds(res.data)
    })
    .catch((err)=>{
      console.log(err.response)
    })
  },[])

  useEffect(() => {
    //setLoading(true)
		axios.get(`${API_URL}/users/${auth.state.username}`)
    .then((res) => {
			setUser(res.data);
      console.log(res.data)
      //setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      //setLoading(false);
    })
  }, [])


  return (
    <>
      <NavBar/>
      <div className='feed-wrapper'>
        <div className='feed'>
        {feeds && feeds.length>0 && feeds.map((f)=>(
          <FeedCard {...f}/>
        ))}
        </div>
        <div className='feed-details'>
          <div className='user-card'>
            <div className='profile-img'> <img src={ProfilePic} style={{height:'3rem'}}/></div>
            <div className='user-info'>
              <span style={{fontSize:'1.2em'}}>{user.firstname} {user.lastname}</span>
              <br/>
              <span style={{fontWeight:'300'}}>@{user.username}</span>
            </div>
          </div>

          <div className='user-options'>
            {/* <div className='option'>
              <i className="far fa-user"/> <span>Profile</span>
            </div> */}
            <div className='option'>
              <NavLink to="/" className="link"><i className="fas fa-film"/> Movies</NavLink>
            </div>
            <div className='option'>
              <NavLink to = {`/${user.username}/watchlist`} className="link"><i className="far fa-clock"/> Watchlist</NavLink>
            </div>
            <div className='option'>
              <NavLink to = {`/${user.username}/followers`} className="link"><i className="fas fa-users"/> Followers</NavLink>
            </div>
            <div className='option'>
            <NavLink to= {`/${user.username}/following`} className="link"><i className="fas fa-user-friends"/> Following</NavLink>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Feed
