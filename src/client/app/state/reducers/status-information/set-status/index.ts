import { IStatusInformationState } from '../default-state'

export default function setStatus (currentState: IStatusInformationState, status: string): IStatusInformationState {
  return {
    ...currentState,
    status
  }
}
