import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import SearchSetlists from './SearchSetlists'
import SearchArtists from './SearchArtists'

function App() {
  return (
    <main>
    <Switch>
      <Route exact path="/auth/login" component={ Login } />
      <Route exact path="/auth/register" component={ Register } />
      <Route exact path="/concert/search/setlist/" component={ SearchSetlists } />
      <Route exact path="/user/search/" component={ SearchArtists } />
    </Switch>
    </main>
  );
}

export default App;
