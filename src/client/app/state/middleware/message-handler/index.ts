export default function messageHandler (evt: MessageEvent) {
  const { type } = evt.data

  const handlerMap: any = {
    // [SET_PLAYER_STATS]: () => store.dispatch(setPlayerStats(payload))
  }

  const handler = handlerMap[type]
  handler && handler()
}
