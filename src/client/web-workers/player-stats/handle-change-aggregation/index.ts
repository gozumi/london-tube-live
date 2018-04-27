import { SET_PLAYER_STATS } from '../../_message-types'
import { aggregateData } from '../data-mapper'

interface INotifications {
  aggregationOrder: string[],
  list: any
}

/**
 * Returns an aggregations of the give array of notifications, ordered by the given
 * aggregation order.
 * @param ctx The web worker context
 * @param notifications The notifications to be re-aggregated
 */
export function handleChangeAggregation (ctx: Worker, notifications: INotifications) {
  const { list, aggregationOrder } = notifications
  ctx.postMessage({
    payload: {
      aggregations: aggregateData(list, aggregationOrder),
      list
    },
    type: SET_PLAYER_STATS
  })
}
