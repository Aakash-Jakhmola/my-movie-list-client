import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {API_URL} from '../../utils/Constants'
import { useParams } from 'react-router'
import UserMiniCard from '../../Components/UserCard/UserMiniCard'

const EmptyFollowersList = () => {
  return <div style={{textAlign:'center'}}>
    Till now No one follows you. :( 
      Tell your friends to follow you
  </div>;
}

function Followers() {
  const {username} = useParams()
  
  const [followers, setFollowers] = useState([])

  useEffect(()=>{
    axios.get(`${API_URL}/api/v2/profile/followers?username=${username}`)
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
      {followers && followers.length > 0? followers.map((f)=>(<UserMiniCard user_details={f.followers_details} is_following={false}/>)) : <EmptyFollowersList />}
    </div>
  )
}

export default Followers
