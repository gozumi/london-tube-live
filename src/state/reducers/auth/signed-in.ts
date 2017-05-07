import { ReduxAction, ReduxState } from './../../../types'
import { AuthState } from '../../../types/enums'

export default function signedIn (state: ReduxState, action: ReduxAction) {
  const newState = {}
  Object.assign(
    newState,
    state,
    {
      authState: AuthState.SignedIn,
      user: action.payload
    }
  )
  return newState
}
