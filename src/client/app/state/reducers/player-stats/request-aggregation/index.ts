import { IPlayerStatsState, STATUS_AWAITING_AGGREGATION_CHANGE } from '../default-state'

export default function requestAggregation (currentState: IPlayerStatsState): IPlayerStatsState {
  return {
    ...currentState,
    status: STATUS_AWAITING_AGGREGATION_CHANGE
  }
}
