import React from 'react';
import HomePage from '../Components/HomePage/HomePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes