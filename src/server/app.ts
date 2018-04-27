import * as cors from 'cors'
import * as express from 'express'
import * as path from 'path'

import apiRouter from './routes/api'

const app = express()
export default app

app.set('port', process.env.PORT || 5000)
app.use(express.static(path.join(__dirname, '../public')))

if (process.env.NODE_ENV === 'development') {
  app.use(cors())
}

app.use('/api', apiRouter)
app.get('/really_working', (req, res) => res.send('It is really working!'))
app.use(notFoundErrorHandler)
app.use(errorHandler)

/**
 * Handles routes that are not found. This function returns a 404 status in the response.
 * @param req The request
 * @param res The response
 * @param next The next function in the chain
 */
function notFoundErrorHandler (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.sendStatus(404)
}

/**
 * Handles server errors.
 * @param err The error
 * @param req The request
 * @param res The response
 * @param next Thenext funciton in the chain
 */
function errorHandler (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
  res.status(err.status || 500)
  res.render('error')
}
