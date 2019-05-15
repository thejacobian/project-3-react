import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import SearchSetlists from './SearchSetlists'
import SearchArtists from './SearchArtists'
import Header from './Header'
import WishList from './WishList'

function App() {
  return (
    <main>
      <Header/>
      <Switch>
        <Route exact path="/auth/login" component={ Login } />
        <Route exact path="/auth/register" component={ Register } />
        <Route exact path="/concert/search/setlist" component={ SearchSetlists } />
        <Route exact path="/user/search" component={ SearchArtists } />
        <Route exact path="/user" component={ WishList } />
      </Switch>
    </main>
  );
}

export default App;
