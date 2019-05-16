import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import SearchSetlists from './SearchSetlists'
import SearchArtists from './SearchArtists'
import Header from './Header'
// import WishList from './WishList'
// import ConcertList from './ConcertList'
import User from './User'
import Home from './Home'
import UserList from './UserList'

function App() {
  return (
    <main className="App">
      <Header/>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/auth/login" component={ Login } />
        <Route exact path="/auth/register" component={ Register } />
        <Route exact path="/concert/search/setlist" component={ SearchSetlists } />
        <Route exact path="/user/search" component={ SearchArtists } />
        <Route exact path="/user" component={ User } />
        <Route exact path="/user/allUsers" component={ UserList } />
      </Switch>
    </main>
  );
}

export default App;
