import {
  ATTEMPTING_SINGING_IN,
  ATTEMPTING_SINGING_OUT,
  SIGNED_IN,
  SIGNED_OUT
} from '../../actions'
import { ReduxAction, ReduxState } from '../../../types'
import attemptingSignIn from './attempting-sign-in'
import attemptingSignOut from './attempting-sign-out'
import signedIn from './signed-in'
import signedOut from './signed-out'
import DEFAULT_STATE from '../../store/default-state'

export default function authReducer(
  state: ReduxState = DEFAULT_STATE,
  action: ReduxAction
) {
  let reducerMap = {
    [ATTEMPTING_SINGING_IN]: (state: ReduxState) => attemptingSignIn(state),
    [ATTEMPTING_SINGING_OUT]: (state: ReduxState) => attemptingSignOut(state),
    [SIGNED_IN]: (state: ReduxState) => signedIn(state, action),
    [SIGNED_OUT]: (state: ReduxState) => signedOut(state, action)
  }

  let reducer = reducerMap[action.type]
  return reducer ? reducer(state) : state
}
