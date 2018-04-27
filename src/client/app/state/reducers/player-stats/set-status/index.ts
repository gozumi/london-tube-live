import { IPlayerStatsState } from '../default-state'

export default function setStatus (
  currenState: IPlayerStatsState,
  newStatus: string
): IPlayerStatsState {
  return {
    ...currenState,
    status: newStatus
  }
}
