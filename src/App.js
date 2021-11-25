import React, {useContext, useEffect, Suspense} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import {Store, AuthContext} from "./state/Store";
import { loadUser } from "./state/auth/authActions";
import PageLoader from "./Components/PageLoader/PageLoader";
import Feed from "./pages/Feed/Feed";
import Home from './pages/Home/Home';
import SignUp from "./pages/SignUp/SignUp";
import Account from "./pages/Account/Account";
import Logout from "./pages/Logout/Logout";
import LoginModal from "./Components/LoginModal/LoginModal";
import SearchMovies from "./pages/SearchMovies/SearchMovies";
import SearchUsers from "./pages/SearchUsers/SearchUsers";
import MovieDetailsModal from "./Components/MovieDetailsModal/MovieDetailsModal";
import NavBar from "./Components/Navbar/Navbar";

function App() {
  const auth = useContext(AuthContext);
  useEffect(()=>{
    loadUser(auth.dispatch)
  },[])
  
  return (
   
    <React.Fragment>
      <Router>
        <Switch>
        <Route exact path="/" render={(routeProps)=><Home {...routeProps}/>}/>
        <Route exact path="/feed" render={(routeProps)=><Feed {...routeProps}/>}/>
        <Route exact path="/signup" render={(routeProps)=><SignUp {...routeProps}/>}/>
        <Route exact path="/login" render={(routeProps)=><LoginModal {...routeProps}/>}/>
        <Route exact path="/logout" render={(routeProps)=><Logout {...routeProps}/>}/>
        <Route exact path="/search-user" render={(routeProps)=><SearchUsers {...routeProps}/>}/>
        <Route exact path="/search-movie/" component={SearchMovies}/>
        {/* <Route exact path='/movies/:id' render={(routeProps)=><MovieDetailsModal {...routeProps}/>} /> */}
        {/* <Route exact path="/search-movie/" render={(routeProps)=><SearchMovies {...routeProps}/>}/> */}
        {/* <Route exact path="/:username/followers" render={(routeProps)=><Account {...routeProps}/>}/> */}
        <Route exact path="/:username" render={(routeProps)=><Account {...routeProps}/>}/>
        <Route exact path="/:username/:page" render={(routeProps)=><Account {...routeProps}/>}/>

        <Route render={()=><h1>NOT FOUND</h1>}/>
        </Switch>
      </Router>
    </React.Fragment>
   
  );
}

export default function AppWithStore() {
  return (
    <Store>
      <App/>
    </Store>
  )
}

