
import { IPlayerStatsState, STATUS_PLAYER_STATS_RECEIVED } from '../default-state'

/**
 *
 * @param currentState
 * @param payload
 */
export default function setPlayerStats (
  currentState: IPlayerStatsState,
  payload: any
): IPlayerStatsState {
  const { aggregations, list, playerStats } = payload
  return {
    ...currentState,
    aggregations,
    list,
    playerStats,
    status: STATUS_PLAYER_STATS_RECEIVED
  }
}
