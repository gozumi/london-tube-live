import { Dispatch, Store } from 'react-redux'
import { IState } from '../reducers/_interfaces'
import { IAction } from '../store/_interfaces'

const combinedMiddleware = [
].map((f) => createMiddleware(f))

export default combinedMiddleware

/**
 * Wraps a given function as a redux middleware function.
 * @param f The function to wrap as a redux middleware function
 */
function createMiddleware (
  f: (action: IAction, next: Dispatch<IAction>, store: Store<IState>) => IAction
) {
  return (store: Store<IState>) => (next: Dispatch<IAction>) => (action: IAction) => f(action, next, store)
}
