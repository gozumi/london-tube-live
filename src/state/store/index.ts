import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { getTubeRoutes } from '../action-creators'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunk]
const enhancers: Array<any> = []

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  )
)

store.dispatch(getTubeRoutes())

export default store
