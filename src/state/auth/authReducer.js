import Cookies from 'js-cookie'

import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  LOGOUT_SUCCESS
} from './authConsts'

const initialAuthState = {
  jwt: Cookies.get("jwt"),
  user_id: Cookies.get("user_id"),
  username : Cookies.get("username"),
  userLoading : false,
  userLoggedIn: false,
  userLoggingIn: false,
  loginError:"",
  signupError:"",
  profileImgURL:"",
}

const authReducer = (state = initialAuthState, action) => {
  switch(action.type) {
    case LOAD_USER_REQUEST:
      return {...state,userLoading:true}
    case LOAD_USER_SUCCESS: 
      return {
        ...state,
        user_id:action.payload.id,
        username:action.payload.username,
        userLoading:false,
        userLoggedIn:true
      }
    case LOAD_USER_ERROR: 
      return {
        ...state,
        jwt:null,
        userLoggedIn:false,
        userLoading:false,
      }
    
    case LOGIN_REQUEST:
      return {...state,userLoading:true,userLoggingIn:true}
    case LOGIN_SUCCESS:
      return {
        ...state,
        jwt:Cookies.get('jwt'),
        user_id:action.payload._id,
        username:action.payload.username,
        userLoading:false,
        userLoggedIn:true,
        userLoggingIn:false,
        loginError:''
      }
    case LOGIN_ERROR:
      return {
        ...state,
        jwt:null,
        userLoggedIn:false,
        userLoading:false,
        userLoggingIn:false,
        loginError:action.payload
      }
    
    case SIGNUP_REQUEST:
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
    
    case LOGOUT_SUCCESS:
      return initialAuthState
    default: return state;

  }
}

export {authReducer, initialAuthState}