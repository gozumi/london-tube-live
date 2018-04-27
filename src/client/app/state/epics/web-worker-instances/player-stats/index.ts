import { setPlayerStatsStatus } from 'client/app/state/action-creators/player-stats'
import { GET_PLAYER_STATS } from 'client/app/state/action-types'
import {
  STATUS_AGGREGATION_CHANGE_REQUEST_SENT,
  STATUS_WAITING_FOR_PLAYER_STATS
} from 'client/app/state/reducers/player-stats/default-state'
import { IAction } from 'client/app/state/store'
import { CHANGE_AGGREGATION } from 'client/web-workers/_message-types'
import { PlayerStatsList } from 'server/routes/api/player-stats/_interfaces'
import PlayerStatsWorker = require('worker-loader!web-workers/player-stats')

import messageHandler from './message-handler'

const playerStatsWorker: Worker = new PlayerStatsWorker()
playerStatsWorker.onmessage = messageHandler

/**
 *
 * @param action
 */
export function getPlayerStatsFromWebWorker (action: IAction) {
  playerStatsWorker.postMessage({
    type: GET_PLAYER_STATS
  })

  return setPlayerStatsStatus(STATUS_WAITING_FOR_PLAYER_STATS)
}

/**
 *
 * @param aggregationOrder
 * @param notificationList
 */
export function requestAggregationChangeFromWebWorker (
  aggregationOrder: string[],
  list: PlayerStatsList
) {
  playerStatsWorker.postMessage({
    payload: { aggregationOrder, list },
    type: CHANGE_AGGREGATION
  })
  return setPlayerStatsStatus(STATUS_AGGREGATION_CHANGE_REQUEST_SENT)
}
