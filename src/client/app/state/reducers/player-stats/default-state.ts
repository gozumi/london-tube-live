import { IPlayerStats, PlayerStatsList } from 'server/routes/api/player-stats/_interfaces'

import { PlayerHierarchy } from '../../../../web-workers/player-stats/data-mapper'

export const STATUS_INITIAL = 'STATUS_INITIAL'
export const STATUS_PLAYER_STATS_RECEIVED = 'STATUS_PLAYER_STATS_RECEIVED'
export const STATUS_WAITING_FOR_PLAYER_STATS = 'STATUS_WAITING_FOR_PLAYER_STATS'
export const STATUS_AWAITING_AGGREGATION_CHANGE = 'STATUS_AWAITING_AGGREGATION_CHANGE'
export const STATUS_AGGREGATION_CHANGE_REQUEST_SENT = 'STATUS_AGGREGATION_CHANGE_REQUEST_SENT'

export interface IPlayerStatsState {
  status: string
  aggregations: PlayerHierarchy
  list: PlayerStatsList
  playerStats: IPlayerStats
}

export interface IAggregationPoints {
  [pointName: string]: string
}

const DEFAULT_STATE: IPlayerStatsState = {
  aggregations: null,
  list: [],
  playerStats: null,
  status: STATUS_INITIAL
}

export default DEFAULT_STATE
