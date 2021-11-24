import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {API_URL} from '../../utils/Constants'
import { useParams } from 'react-router'

import UserMiniCard from '../../Components/UserCard/UserMiniCard'

export default function Following() {

  const {username} = useParams()
  
  const [following, setFollowing] = useState([])

  useEffect(()=>{
    axios.get(`${API_URL}/api/v2/profile/following?username=${username}`)
    .then((res)=>{
      console.log(res.data)
      setFollowing(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <div style={{margin:'4rem 15rem'}}>
      {following && following.map((f)=>(<UserMiniCard username={f.following} 
      firstname={f.following_details.firstname} 
      lastname={f.following_details.lastname}/>))}
    </div>
  )
}
