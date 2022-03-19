import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.scss';
import backButton from './../../assets/icons/back-button.svg';
import { FormGroup, Container, Row, Col } from 'reactstrap';
import { API_URL } from '../../utils/Constants';

import Loader from '../../Components/Loader/Loader';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  function goBack() {
    history.goBack();
  }

  function signup() {
    if (!firstName) {
      setErrorMsg('First Name cannot be empty');
      return;
    } else if (!username) {
      setErrorMsg('Username cannot be empty');
      return;
    } else if (!password) {
      setErrorMsg('Password cannot be empty');
      return;
    } else if (password !== confPass) {
      setErrorMsg('Passwords do not match');
      return;
    }
    setErrorMsg('');
    let user = {
      firstname: firstName,
      lastname: lastName,
      username: username,
      password: password,
    };
    console.log(user);
    setLoading(true);
    axios
      .post(`${API_URL}/users/register`, user)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('printing', error.response.data);
        if (error.response && error.response.data.error) {
          setErrorMsg(error.response.data.error);
        } else {
          setErrorMsg('something went wrong');
        }
        setLoading(false);
      });
  }

  return (
    <div className='signup'>
      <div className='signup-left'>
        <img className='back-btn' src={backButton} onClick={goBack} />
        <div className='signup-box'>
          <Container>
            <Row>
              <Col>
                <h2>Create a New Account</h2>
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <FormGroup>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='First Name*'
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <FormGroup>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Username*'
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <FormGroup>
                  <input
                    className='form-control'
                    type='password'
                    placeholder='Password*'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <FormGroup>
                  <input
                    className='form-control'
                    type='password'
                    placeholder='Confirm Password*'
                    value={confPass}
                    onChange={(e) => {
                      setConfPass(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <FormGroup>
                  {loading ? (
                    <Loader />
                  ) : (
                    <button onClick={signup}> Sign Up </button>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row className='login-link'>
              <a href='/login'> Already Have an Account ? </a>
            </Row>
            <Row>
              <Col md='12'>
                <div style={{ color: 'red' }}>{errorMsg ? errorMsg : ''}</div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className='signup-right'>
        <div className='right-box-content'>
          <p style={{ fontSize: '2.7rem', fontWeight: '700', lineHeight: 1 }}>
            {' '}
            Explore New Movies
          </p>
          <p>
            Find the best movies picked by your friends. Share the movies you
            loved. Help your friends.
          </p>
        </div>
      </div>
    </div>
  );
}
