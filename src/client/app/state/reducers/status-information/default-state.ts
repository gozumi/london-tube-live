export const STATUS_INITIAL = 'STATUS_INITIAL'
export const STATUS_WAITING_FOR_LISTENER_TO_START = 'STATUS_WAITING_FOR_LISTENER_TO_START'
export const STATUS_LISTENER_HAS_STARTED = 'STATUS_LISTENER_HAS_STARTED'

export interface IStatusInformationState {
  status: string
  test: any
}

const DEFAULT_STATE: IStatusInformationState = {
  status: STATUS_INITIAL,
  test: null
}

export default DEFAULT_STATE
