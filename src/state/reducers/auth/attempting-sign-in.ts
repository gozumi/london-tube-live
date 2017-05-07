import { AuthState } from '../../../types/enums'
import { ReduxState, ReduxAction } from '../../../types'

export default function attemptingSignIn(state: ReduxState) {
  const newState = {}
  Object.assign(
    newState,
    state,
    {
      authState: AuthState.AttemptingSignIn
    }
  )
  return newState
}
