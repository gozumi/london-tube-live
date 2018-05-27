import {
  AKNOWLEDGE_LISTENER_HAS_STARTED,
  START_LISTENING_FOR_STATUS_INFORMATION,
  STATUS_INFORMATION_RECEIVED
} from '../../action-types'
import { IAction } from '../../store/_interfaces'
import DEFAULT_STATE, { IStatusInformationState,
  STATUS_LISTENER_HAS_STARTED,
  STATUS_WAITING_FOR_LISTENER_TO_START
} from './default-state'
import setStatus from './set-status'
import updateStatusInformation from './update-status-information'

export default function statusInformationReducer (
  currentState: IStatusInformationState = DEFAULT_STATE,
  action: IAction
) {
  const { payload } = action
  const reducerMap: any = {
    [START_LISTENING_FOR_STATUS_INFORMATION]: () => setStatus(currentState, STATUS_WAITING_FOR_LISTENER_TO_START),
    [AKNOWLEDGE_LISTENER_HAS_STARTED]: () => setStatus(currentState, STATUS_LISTENER_HAS_STARTED),
    [STATUS_INFORMATION_RECEIVED]: () => updateStatusInformation(currentState, payload)
  }

  const reducer = reducerMap[action.type]
  return reducer ? reducer(currentState, payload) : currentState
}
