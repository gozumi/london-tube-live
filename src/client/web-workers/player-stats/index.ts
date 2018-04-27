import { CHANGE_AGGREGATION, GET_PLAYER_STATS } from '../_message-types'
import { handleChangeAggregation } from './handle-change-aggregation'
import { handleGetPlayerStats } from './handle-get-player-stats'

const ctx: Worker = self as any

ctx.addEventListener('message', handler)

function handler (evt: MessageEvent) {
  const { payload, type } = evt.data
  const handlerMap: any = {
    [GET_PLAYER_STATS]: () => handleGetPlayerStats(ctx),
    [CHANGE_AGGREGATION]: () => handleChangeAggregation(ctx, payload)
  }

  const handlerFunction = handlerMap[type]
  handlerFunction && handlerFunction()
}
