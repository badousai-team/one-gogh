import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Test from './pages/test'
import Profile from './pages/profile'

export const Routes = () => (
  <Switch>
    <Route path="/test" component={Test} />
    <Route path="/profile" component={Profile} />
    <Route component={Home} />
  </Switch>
)
