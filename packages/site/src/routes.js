import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import NFTDetail from './pages/nft-detail'
import Test from './pages/test'
import Profile from './pages/profile'

export const Routes = () => (
  <Switch>
    <Route path="/test" component={Test} />
    <Route path="/nft/:id?" component={NFTDetail} />
    <Route path="/:username" component={Profile} />
    <Route component={Home} />
  </Switch>
)
