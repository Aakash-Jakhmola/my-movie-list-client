import React from 'react'
import './UserMiniCard.scss'

import ProfilePic from '../../assets/profile_icon.png'

export default function UserMiniCard(props) {
 // console.log(props)
  return (
    <div className='user-mini-card'>
      <div className='profile-img'> <img src={ProfilePic} style={{height:'3rem'}}/></div>
      <div className='user-info'>
        <span style={{fontSize:'1.2em'}}>{props.firstname} {props.lastname}</span>
      <br/>
      <span style={{fontWeight:'300'}}>@{props.username}</span>
      </div>
    </div>
  )
}
