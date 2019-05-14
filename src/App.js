import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <main>
    <Switch>
      <Route exact path="/auth/login" component={ Login } />
      <Route exact path="/auth/register" component={ Register } />
    </Switch>
    </main>
  );
}

export default App;
