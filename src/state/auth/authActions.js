import axios from 'axios';
import { API_URL } from '../../utils/Constants';
import Cookies from 'js-cookie';

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
  LOGOUT_SUCCESS,
} from './authConsts';

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginError = (err) => ({ type: LOGIN_ERROR, payload: err });
export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupError = (err) => ({ type: SIGNUP_ERROR, payload: err });
export const signupSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});

export const loadUserRequest = () => ({ type: LOAD_USER_REQUEST });
export const loadUserSuccess = (data) => ({
  type: LOAD_USER_SUCCESS,
  payload: data,
});
export const loadUserError = () => ({ type: LOAD_USER_ERROR });

export const logOut = () => ({ type: LOGOUT_SUCCESS });

export const loginUser = (dispatch, credentials) => {
  dispatch(loginRequest());
  axios
    .post(`${API_URL}/account/login`, credentials)
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        Cookies.set('jwt', res.data.token, {
          path: '',
          secure: true,
          sameSite: false,
        });
        dispatch(loginSuccess(res.data));
      }
    })
    .catch((error) => {
      // console.log(error.response,error.response.data)
      if (error.response && error.response.data) {
        if (error.response.data instanceof String)
          dispatch(loginError(error.response.data.toLowerCase()));
        else dispatch(loginError(error.response.data.message));
      } else {
        dispatch(loginError('something went wrong'));
      }
    });
};

export const logOutUser = async (dispatch) => {
  // await axios.post(`${API_URL}/account/logout`,{},{withCredentials:true})
  // .then(() => {
  //   console.log('here2');
  //   dispatch(logOut());
  // })
  // .catch((err) => console.log(err))
};

export const loadUser = (dispatch) => {
  dispatch(loadUserRequest());
  axios
    .get(`${API_URL}/account/load`, { withCredentials: true })
    .then((res) => {
      if (res.data.error) dispatch(loadUserError());
      else dispatch(loadUserSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loadUserError());
    });
};
