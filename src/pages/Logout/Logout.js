import React, {useContext, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import { logOutUser } from '../../state/auth/authActions';
import { AuthContext } from '../../state/Store';

export default function Logout() {
  const auth = useContext(AuthContext)
  useEffect(async()=>{
    await logOutUser(auth.dispatch);
  },[])

  return (
    <Redirect to="/"/>
  )
}
