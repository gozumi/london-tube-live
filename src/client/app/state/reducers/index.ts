import { combineReducers } from 'redux'

import playerStatsReducer from './player-stats'

const rootReducer = combineReducers({
  playerStats: playerStatsReducer
})

export default rootReducer
