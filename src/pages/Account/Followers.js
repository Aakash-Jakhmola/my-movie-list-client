import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {API_URL} from '../../utils/Constants'
import { useParams } from 'react-router'

import UserMiniCard from '../../Components/UserCard/UserMiniCard'

function Followers() {
  const {username} = useParams()
  
  const [followers, setFollowers] = useState([])

  useEffect(()=>{
    axios.get(`${API_URL}/users/${username}/followers`)
    .then((res)=>{
      console.log(res.data)
      setFollowers(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <div style={{margin:'4rem 15rem'}}>
      {followers && followers.map((f)=>(<UserMiniCard {...f}/>))}
    </div>
  )
}

export default Followers
