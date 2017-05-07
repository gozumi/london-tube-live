import { AuthState } from '../../../types/enums'
import { ReduxState, ReduxAction } from '../../../types'

export default function attemptingSignOut(state: ReduxState) {
  const newState = {}
  Object.assign(
    newState,
    state,
    {
      authState: AuthState.AttemptingSignOut
    }
  )
  return newState
}
