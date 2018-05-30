import { combineReducers } from 'redux'

import statusInformationReducer from './status-information'

const rootReducer = combineReducers({
  statusInformation: statusInformationReducer
})

export default rootReducer
