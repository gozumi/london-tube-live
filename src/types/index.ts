export interface ReduxState {
  loggedIn?: boolean
}

export interface ReduxAction {
  type: string,
  payload: object
}
