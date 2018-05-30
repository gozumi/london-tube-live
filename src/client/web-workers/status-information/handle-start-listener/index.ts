import { webSocket } from 'rxjs/webSocket'

const url = 'wss//localhost:8080'

export function handleStartListeningForLineStatus (ctx: Worker) {
  const socket$ = webSocket(url)

  socket$.subscribe(
    (msg) => null,
    (_err) => null,
    () => null
  )
}
