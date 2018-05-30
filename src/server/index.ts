import * as fs from 'fs'
import * as https from 'https'
import * as path from 'path'
import * as logger from 'winston'
import * as WS from 'ws'

const server = https.createServer({
  cert: fs.readFileSync(path.join(__dirname, '../../../../_security/server.crt')),
  key: fs.readFileSync(path.join(__dirname, '../../../../_security/server.key'))
})

const wss = new WS.Server({ server }, () => {
  logger.info('  App is running at http://localhost:%d in %s mode', 8080)
})

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    logger.info('received: %s', message)
  })

  ws.send('>>>>>>>>>>>> secure server sent this something')
})

logger.info('>>>>>> starting server')
server.listen(8080)
