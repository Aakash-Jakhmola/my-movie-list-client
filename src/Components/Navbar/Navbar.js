import React, { useContext, useState, useEffect } from 'react';
import './Navbar.scss';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  FormGroup,
} from 'reactstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { logOutUser } from '../../state/auth/authActions';
import { AuthContext } from '../../state/Store';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchMovies, setsearchMovies] = useState(false);
  const [findFriend, setFindFriend] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [logoutRedirect, setLogoutRedirect] = useState(false);

  const userQueryHandle = (e) => {
    if (e.key === 'Enter' && userQuery.length > 0) {
      history.push(`/search-user?name=${userQuery}`);
      window.location.reload();
    }
  };

  const movieQueryHandler = (e) => {
    if (e.key === 'Enter' && movieQuery.length > 0) {
      history.push(`/search-movie?q=${movieQuery}`);
      window.location.reload();
    }
  };

  const toggle = () => setIsOpen(!isOpen);
  const ref = React.createRef();

  const logOutLocal = async () => {
    await logOutUser(auth.dispatch);
    setLogoutRedirect(true);
  };

  return logoutRedirect ? (
    <Redirect to='/' />
  ) : (
    <div ref={ref}>
      <Navbar dark expand='md' fixed='top' className='navbar'>
        <NavbarText>
          <Link to='/' className='home-page-link'>
            {' M O V I S T'}
          </Link>
        </NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <FormGroup className='navbar-form'>
              <input
                className='form-control'
                type='text'
                placeholder='Find Friends'
                value={userQuery}
                onKeyPress={userQueryHandle}
                onChange={(e) => {
                  setUserQuery(e.target.value);
                }}
                style={{ display: `${findFriend ? 'block' : 'none'}` }}
              />
            </FormGroup>
            <NavItem>
              <button
                onClick={() => {
                  setFindFriend((prev) => !prev);
                  setsearchMovies(false);
                }}>
                <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
                  <circle
                    cx='12'
                    cy='8'
                    r='3.25'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2.5'></circle>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2.5'
                    d='M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14'></path>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2.5'
                    d='M17 14.75V19.25'></path>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2.5'
                    d='M19.25 17L14.75 17'></path>
                </svg>
              </button>
            </NavItem>
            <FormGroup className='navbar-form'>
              <input
                className='form-control'
                type='text'
                placeholder='Search Movies'
                value={movieQuery}
                onKeyPress={movieQueryHandler}
                onChange={(e) => {
                  setMovieQuery(e.target.value);
                }}
                style={{ display: `${searchMovies ? 'block' : 'none'}` }}
              />
            </FormGroup>
            <NavItem>
              <button
                onClick={() => {
                  setFindFriend(false);
                  setsearchMovies((prev) => !prev);
                }}>
                <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2.5'
                    d='M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z'></path>
                </svg>
              </button>
            </NavItem>
            <NavItem>
              <NavLink
                className='navlink'
                activeClassName='active'
                onClick={logOutLocal}>
                <svg width='26' height='26' fill='none' viewBox='0 0 24 24'>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2.5'
                    d='M15.75 8.75L19.25 12L15.75 15.25'></path>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2.5'
                    d='M19 12H10.75'></path>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2.5'
                    d='M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25'></path>
                </svg>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div style={{ height: '50px' }}></div>
    </div>
  );
}
