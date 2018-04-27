import { setPlayerStats } from 'client/app/state/action-creators/player-stats'
import store from 'client/app/state/store'
import { SET_PLAYER_STATS } from 'client/web-workers/_message-types'

export default function messageHandler (evt: MessageEvent) {
  const { payload, type } = evt.data

  const handlerMap: any = {
    [SET_PLAYER_STATS]: () => store.dispatch(setPlayerStats(payload))
  }

  const handler = handlerMap[type]
  handler && handler()
}
