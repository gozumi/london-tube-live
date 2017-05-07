import { ReduxAction } from '../../../types'

export function setRoutes(state: any, payload: any) {
  const newState = {}
  Object.assign(
    newState,
    state,
    {
      lines: payload.lines
    }
  )
  return newState
}

export function setRoutesError(state: any, payload: any) {
  return state
}
