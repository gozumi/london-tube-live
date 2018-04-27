import { SET_PLAYER_STATS, SET_PLAYER_STATS_STATUS } from 'client/app/state/action-types'
import { IAction } from 'client/app/state/store'

import DEFAULT_STATE, { IPlayerStatsState } from './default-state'
import setPlayerStats from './set-player-stats'
import setStatus from './set-status'

export default function systemReducer (
  currentState: IPlayerStatsState = DEFAULT_STATE,
  action: IAction
) {
  const { payload } = action
  const reducerMap: any = {
    [SET_PLAYER_STATS]: () => setPlayerStats(currentState, payload),
    [SET_PLAYER_STATS_STATUS]: () => setStatus(currentState, payload)
  }

  const reducer = reducerMap[action.type]
  return reducer ? reducer(currentState, payload) : currentState
}
