import './app.component.css'

import AppNavigation from 'client/app/blocks/app-navigation'
import store from 'client/app/state/store'
import * as React from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Home from './features/home/home.component'
import { getPlayerStats } from './state/action-creators/player-stats'

store.dispatch(getPlayerStats())

export default class App extends React.Component<{}, {}> {
  public render () {
    return (
        <Provider store={store}>
          <Router>
            <section className='app'>
              <div className='logo'/>
              <AppNavigation />
                <Switch>
                  <Route exact={true} path='/home' component={Home} />
                  <Redirect to='/home' />
                </Switch>
            </section>
          </Router>
        </Provider>
    )
  }
}
