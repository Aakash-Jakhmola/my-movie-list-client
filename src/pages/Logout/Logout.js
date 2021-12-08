import React, {useContext, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import { logOutUser } from '../../state/auth/authActions';

export default function Logout() {
  
  useEffect(()=>{
    const auth = useContext(AuthContext)
    logOutUser(auth.dispatch);
  },[])

  return (
    <Redirect to="/"/>
  )
}
