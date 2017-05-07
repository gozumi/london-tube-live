import {
  SET_TUBE_ROUTES,
  SET_TUBE_ROUTES_ERROR
} from '../../actions'
import { ReduxAction } from '../../../types'
import { setRoutes, setRoutesError } from './set-routes'
import DEFAULT_STATE from '../../store/default-state'

export default function authReducer(
  state: any = DEFAULT_STATE,
  action: ReduxAction
) {
  let reducerMap = {
    [SET_TUBE_ROUTES]: (state: any) => setRoutes(state, action.payload),
    [SET_TUBE_ROUTES_ERROR]: (state: any) => setRoutesError(state, action.payload)
  }

  let reducer = reducerMap[action.type]
  return reducer ? reducer(state) : state
}
