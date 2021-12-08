import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {API_URL} from '../../utils/Constants'
import { useParams } from 'react-router'
import UserMiniCard from '../../Components/UserCard/UserMiniCard'


const EmptyFollowingList = () => {
  return <div style={{textAlign:'center'}}>
    You don't follow anyone
    Follow your friends to see what movies they are watching.
  </div>;
}

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
      {following && following.length > 0 ? following.map((f)=>(<UserMiniCard 
      user_details={f.following_details} 
      is_following = {true}
      fromFollowingList={true}
      />)) : <EmptyFollowingList />}
    </div>
  )
}
