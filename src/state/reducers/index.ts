import { combineReducers } from 'redux'
import tubeReducer from './tube'

const rootReducer = combineReducers({
  tube: tubeReducer
})

export default rootReducer
