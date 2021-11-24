import React from 'react'
import './FeedCard.scss'

import ProfilePic from '../../assets/profile_icon.png'

export default function FeedCard(props) {
  console.log('from props',props)
  return (
    <div className='feed-card'>
      <div> 
        <img src={ProfilePic} style={{height:'1.8rem', marginRight:'1rem'}}/>
        {props.username} 
      </div>
      <div className='review'>
        {props.review}
      </div>
      <div>
        <img src={props.movie_details.poster_url} style={{height:'28rem',margin:'0 5rem'}}/>
      </div>
    </div>
  )
}
