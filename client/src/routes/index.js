import React from 'react';
import { Switch, Route } from 'react-router-dom'

import CreateTicket from '../pages/create-ticket';
import Login from '../pages/login';
import NotFound from '../pages/not-found';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/create-ticket' component={CreateTicket}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </main>
)

export default Routes
