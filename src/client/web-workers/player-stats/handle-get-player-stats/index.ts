import { SET_PLAYER_STATS, SET_PLAYER_STATS_ERROR } from 'client/web-workers/_message-types'
import { DOM } from 'rx-dom'
import { IPlayerStatsListItem } from 'server/routes/api/player-stats/_interfaces'

import { aggregateData, POINTS_BREAKDOWN } from '../data-mapper'

/**
 * Handles a GET_NOTIFICATIONS message received by the web worker. It handles
 * this message by making an AJAX call to the notifications API endpoint.
 * If notifications are received successfully, they are sent to the initiator
 * of the GET_NOTIFICATIONS message.
 *
 * If an error is encountered, An error message is sent back to the message
 * initiator.
 * @param ctx The web worker in question
 */
export function handleGetPlayerStats (ctx: Worker) {
  DOM.ajax({
    responseType: 'json',
    url: `${API_URL_BASE}api/players_stats`
  })
  .subscribe(
    (data) => handleAjaxSuccess(data, ctx),
    (error) => handleAjaxErrors(error, ctx)
  )
}

/**
 * Handles successful AJAX calls to the notification endpoint.
 * @param data The notifications received from the AJAX call
 * @param ctx The web worker
 */
function handleAjaxSuccess (data: DOM.AjaxSuccessResponse, ctx: Worker) {
  const playerStats = (data.response as IPlayerStatsListItem[])
  ctx.postMessage({
    payload: {
      aggregations: aggregateData(playerStats, ['team', 'playerName', POINTS_BREAKDOWN]),
      list: playerStats
    },
    type: SET_PLAYER_STATS
  })
}

/**
 * Handles unsuccessful AJAX calls to the notification endpoint.
 * @param error The error received from the AJAX call
 * @param ctx The web worker
 */
function handleAjaxErrors (error: DOM.AjaxErrorResponse, ctx: Worker) {
  ctx.postMessage({
    error,
    type: SET_PLAYER_STATS_ERROR
  })
}
