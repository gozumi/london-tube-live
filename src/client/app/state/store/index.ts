import { DEVELOPMENT } from 'client/app/_contants'
import rootReducer from 'client/app/state/reducers'
import { applyMiddleware, compose, createStore } from 'redux'

import middleware from '../middleware'

const composeEnhancers = process.env.NODE_ENV === DEVELOPMENT ?
  ((self as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose

const enhancers: any[] = []

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  )
)

export default store
