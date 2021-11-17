import React,{useReducer} from 'react'
import {authReducer,initialAuthState } from './auth/authReducer'

export const AuthContext = React.createContext()

export function Store(props) {
  const [auth, dispatch] = useReducer(authReducer, initialAuthState);
  return (
    <AuthContext.Provider value={{state: auth, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  )
}
