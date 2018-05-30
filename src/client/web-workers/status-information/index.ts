import { START_LISTENING } from './_message_types'
import { handleStartListeningForLineStatus } from './handle-start-listener'

const ctx: Worker = self as any

ctx.addEventListener('message', handler)

function handler (evt: MessageEvent) {
  const { type } = evt.data
  const handlerMap: any = {
    [START_LISTENING]: () => handleStartListeningForLineStatus(ctx)
  }

  const handlerFunction = handlerMap[type]
  handlerFunction && handlerFunction()
}
