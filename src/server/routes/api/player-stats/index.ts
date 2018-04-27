/* tslint:disable:max-line-length object-literal-sort-keys */
import { NextFunction, Request, Response } from 'express'
import * as request from 'request'
import { IPlayerStats, IPlayerStatsListItem, PlayerStatsResultSetRow } from './_interfaces'

export function playerStats (req: Request, res: Response, next: NextFunction) {
  // xxxconst url = 'https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight='
  const url = 'https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight='

  const options = {
    headers: {
      'host': 'stats.nba.com',
      'cache-control': 'max-age=0',
      'connection': 'keep-alive',
      'accept-encoding' : 'Accepflate, sdch',
      'accept-language': 'he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    },
    url
  }
  request(options, (error: any, response: request.Response, body: any) => {
    if (error) {
      res.sendStatus(500)
    }

    const jsonBody = (JSON.parse(body) as IPlayerStats)
    let returnValue = null
    if (jsonBody && jsonBody.resultSets && jsonBody.resultSets[0]) {
      const rowSet = jsonBody.resultSets[0].rowSet
      returnValue = rowSet
        .map(listMapper)
    }
    res.json(returnValue)
  })
}

/**
 *
 * @param row
 */
export function listMapper (row: PlayerStatsResultSetRow): IPlayerStatsListItem {
  const fgm: number = row[10] as number
  const fg3m: number = row[13] as number
  const ftm: number = row[16] as number
  const playerId: number = row[0] as number
  const playerName: string = row[1] as string
  const team: string = row[3] as string
  return {
    playerId,
    playerName,
    pointsBreakDown: {
      ['2 Pointers']: (fgm - fg3m) * 2,
      ['3 Pointers']: fg3m * 3,
      ['Free Throws']: ftm
    },
    team
  }
}
