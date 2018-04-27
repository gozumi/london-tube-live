import { Router } from 'express'

import { playerStats } from './player-stats'

const apiRouter = Router()

apiRouter.get('/players_stats', playerStats)

export default apiRouter
