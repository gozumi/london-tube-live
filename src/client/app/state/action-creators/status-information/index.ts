import {
  AKNOWLEDGE_LISTENER_HAS_STARTED,
  START_LISTENING_FOR_STATUS_INFORMATION,
  STATUS_INFORMATION_RECEIVED
} from 'client/app/state/action-types'
import { IAction } from 'client/app/state/store/_interfaces'

export function receiveStatusInformation (test: any): IAction {
  return {
    payload: test,
    type: STATUS_INFORMATION_RECEIVED
  }
}

export function startListeningForStatusInformation (): IAction {
  return {
    type: START_LISTENING_FOR_STATUS_INFORMATION
  }
}

export function acknowledgeListenerHasStarted (): IAction {
  return {
    type: AKNOWLEDGE_LISTENER_HAS_STARTED
  }
}
