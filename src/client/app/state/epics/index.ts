import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

import { IAction, IState } from 'client/app/state/store'
import { Store } from 'redux'
import { ActionsObservable, combineEpics, Epic } from 'redux-observable'

import { GET_PLAYER_STATS, REQUEST_NEW_PLAYER_STATS_AGGREGATION } from '../action-types'
import { getPlayerStatsFromWebWorker, requestAggregationChangeFromWebWorker } from './web-worker-instances/player-stats'

const rootEpic: Epic<IAction, IState> = combineEpics(
  getPlayerStats,
  changePlayerStatsAggregation
)

export default rootEpic

function getPlayerStats (action$: ActionsObservable<IAction>) {
  return action$
    .filter((action) => action.type === GET_PLAYER_STATS)
    .map(getPlayerStatsFromWebWorker)
}

function changePlayerStatsAggregation (action$: ActionsObservable<IAction>, store: Store<IState>) {
  return action$
    .filter((action) => action.type === REQUEST_NEW_PLAYER_STATS_AGGREGATION)
    .map((action) => {
      const { list } = store.getState().playerStats
      return requestAggregationChangeFromWebWorker(action.payload, list)
    })
}
