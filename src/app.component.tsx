import * as React from 'react'
import { Provider } from 'react-redux'
import store from './state/store'
import { Home } from './features/home/home.component'

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

