import React,{useEffect, useState} from 'react'
import axios from 'axios'
import queryString from 'query-string'

import { API_URL } from '../../utils/Constants'
import './SearchUsers.scss'
import NavBar from '../../Components/Navbar/Navbar'
import UserMiniCard from '../../Components/UserCard/UserMiniCard'

export default function SearchUsers(props) {
  let query = queryString.parse(props.location.search);
  const [users, setUsers] = useState([])

  useEffect(()=>{
    axios.get(`${API_URL}/api/v2/profile/search?name=${query.name}`)
    .then((res)=>{
      console.log(res.data)
      setUsers(res.data)
    })
    .catch((err)=>{
      console.log(err.response)
    })
  },[])

  return (
    <>
    <NavBar />
    <div className='search-user-wrapper'>
      {users && users.length>0 && users.map((f)=>(<UserMiniCard {...f}/>))}
    </div>
    </>
  )
}
