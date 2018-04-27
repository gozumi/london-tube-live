export interface IPlayerStats {
  resource: string
  parameters: IPlayerStatsParameters
  resultSets: IPlayerStatsResultSet[]
}

export interface IPlayerStatsParameters {
  MeasureType: string,
  PerMode: string,
  PlusMinus: string,
  PaceAdjust: string,
  Rank: string,
  LeagueID: string,
  Season: string,
  SeasonType: string,
  PORound: number,
  Outcome: string,
  Location: string,
  Month: number,
  SeasonSegment: string,
  DateFrom: string,
  DateTo: string,
  OpponentTeamID: number,
  VsConference: string,
  VsDivision: string,
  TeamID: number,
  Conference: string,
  Division: string,
  GameSegment: string,
  Period: number,
  ShotClockRange: string,
  LastNGames: number,
  GameScope: string,
  PlayerExperience: string,
  PlayerPosition: string,
  StarterBench: string,
  DraftYear: string,
  DraftPick: string,
  College: string,
  Country: string,
  Height: string,
  Weight: string,
}

export interface IPlayerStatsResultSet {
  name: string
  headers: string[]
  rowSet: PlayerStatsResultSetRow[]
}

export type PlayerStatsResultSetRow = PlayerStatsResultSetRowItem[]

export type PlayerStatsResultSetRowItem = string | number

export interface IPlayerStatsListItem {
  playerId: number
  playerName: string
  team: string
  pointsBreakDown: {
    ['2 Pointers']: number
    ['3 Pointers']: number
    ['Free Throws']: number
    [key: string]: number
  }
  [key: string]: string | number | object
}

export type PlayerStatsList = IPlayerStatsListItem[]
