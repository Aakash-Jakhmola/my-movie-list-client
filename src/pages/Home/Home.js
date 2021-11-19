import React, {useState, useEffect, useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'

import './Home.scss'
import { AuthContext } from '../../state/Store';
import LoginModal from '../../Components/LoginModal/LoginModal'
import GirlWithCorn from '../../assets/girl-with-coke.jpg'

function Home() {
  const auth = useContext(AuthContext)
  const [loginOpen, setLoginOpen] = useState(false)
  const [homeStyle, setHomeStyle] = useState({})

  useEffect(()=>{
    if(!loginOpen)
      setHomeStyle({})
    else {
      setHomeStyle({
        filter:'blur(6px)'
      })
    }
  },[loginOpen])

  if(auth.state.userLoggedIn)
    return <Redirect to={`/${auth.state.username}`}/>
  return (
    <>
    <div className='home' style={homeStyle}>
      <div className='intro'>
        
        <div className = 'intro-nav'>
          <div className='intro-nav-logo'>
            here will be logo
          </div>
          <div className='intro-nav-links'>
            <Link to='/'>About</Link>
            <Link to='/signup'>Signup</Link>
            <button className='signin-btn' onClick={()=>{setLoginOpen(true)}}>Login</button>
          </div>
        </div>
        
        <div className='intro-body'>
          <div className='intro-left'>
            <div className='intro-left-content'>
              <p style={{fontSize:'3.1rem', fontWeight:'700'}}> My Movies List</p>
              <p>This web application enables users to share list of movies they have watched with their friends. Users have feature to review and score watched movies to help out their friends.  </p>
              <div className='intro-btns'>
                <Link to='/signup'> <button>Get Started &#8594;</button></Link>
              </div>
            </div>
          </div>
          <div className='intro-right'>
          <img src={GirlWithCorn} style={{height:'22rem', borderRadius:'10px'}} alt='girl with corn'/>
          </div>
        </div>

      </div>
    </div>
    {loginOpen && <LoginModal setLoginOpen={setLoginOpen}/>}
    </>
  )
}

export default Home
