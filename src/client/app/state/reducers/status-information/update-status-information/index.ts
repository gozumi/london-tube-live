import { IStatusInformationState } from '../default-state'

export default function updateStatusInformation (currentState: IStatusInformationState, test: any) {
  return {
    ...currentState,
    test
  }
}
