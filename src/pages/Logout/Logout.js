import React, {useEffect} from 'react'
import { Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Logout() {
  
  useEffect(()=>{
    Cookies.remove("jwt")
    Cookies.remove("username")
    Cookies.remove("user_id")
  },[])

  return (
    <Redirect to="/"/>
  )
}
