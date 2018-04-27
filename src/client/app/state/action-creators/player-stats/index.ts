import {
  GET_PLAYER_STATS,
  REQUEST_NEW_PLAYER_STATS_AGGREGATION,
  SET_PLAYER_STATS,
  SET_PLAYER_STATS_STATUS
} from 'client/app/state/action-types'
import { IAction } from 'client/app/state/store'

export function getPlayerStats () {
  return {
    type: GET_PLAYER_STATS
  }
}

export function setPlayerStatsStatus (newStatus: string) {
  return {
    payload: newStatus,
    type: SET_PLAYER_STATS_STATUS
  }
}

export function setPlayerStats (data: any) {
  return {
    payload: data,
    type: SET_PLAYER_STATS
  }
}

export function requestAggregation (aggregationOrder: string[]): IAction {
  return {
    payload: aggregationOrder,
    type: REQUEST_NEW_PLAYER_STATS_AGGREGATION
  }
}
