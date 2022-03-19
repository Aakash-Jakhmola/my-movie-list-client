import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router';

import './LoginModal.scss';
import { FormGroup, Container, Row, Col } from 'reactstrap';
import Loader from '../Loader/Loader';
import { loginUser } from '../../state/auth/authActions';
import { AuthContext } from '../../state/Store';

function LoginModal(props) {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = () => {
    console.log(username, password);
    let userCred = { username: username, password: password };
    loginUser(auth.dispatch, userCred);
  };

  if (auth.state.userLoggedIn) {
    return (
      <Redirect
        to={(props.location.state && props.location.state.from) || '/'}
      />
    );
  }

  return (
    <div className='login-modal-overlay'>
      <div className='login-modal'>
        {props.setLoginOpen && (
          <i
            className='fas fa-times modal-close-btn'
            onClick={() => {
              props.setLoginOpen(false);
            }}
          />
        )}
        <Container>
          <Row>
            <Col>
              <h2>Login</h2>
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <FormGroup>
                <label htmlFor='username' className='fontType'>
                  USERNAME
                </label>
                <input
                  className='form-control'
                  type='text'
                  id='username'
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
                <label htmlFor='password' className='fontType'>
                  PASSWORD
                </label>
                <input
                  className='form-control'
                  type='password'
                  id='password'
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
                {auth.state.userLoggingIn ? (
                  <Loader />
                ) : (
                  <button onClick={loginSubmit}> Login </button>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className='error-resp'>{auth.state.loginError}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LoginModal;
