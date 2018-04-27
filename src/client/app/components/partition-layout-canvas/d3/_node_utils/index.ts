import { ScaleLinear } from 'd3'

export interface IScale {
  x: ScaleLinear<number, number>,
  y: ScaleLinear<number, number>,
  width: number,
  height: number
}
