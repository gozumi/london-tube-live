import { ReduxAction, ReduxState } from './../../../types'
import { AuthState } from '../../../types/enums'

export default function signedOut (state: ReduxState, action: ReduxAction) {
  const newState = {}
  Object.assign(
    newState,
    state,
    {
      authState: AuthState.SignedOut,
      user: null
    }
  )
  return newState
}
