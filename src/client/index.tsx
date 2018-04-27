import './_styles/main.css'
import './load-text'

import App from 'client/app/app.component'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

const rootElement = document.getElementById('app')

renderRoot(App)

if ((module as any).hot) {
  (module as any).hot.accept('./app/app.component', () => {
    const NextApp = require('./app/app.component').default
    renderRoot(NextApp)
  })
}

///////////////////////////////////////////////////////////////////////////////

/**
 * Renders a given component on the root element
 * @param Component The component to render on the root element
 */
function renderRoot (Component: typeof App) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement
  )
}
