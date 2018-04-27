/* tslint:disable:cognitive-complexity */
import * as d3 from 'd3'

export interface IFisheye {
  (_: any): any
  radius?: any
  distortion?: any
  focus?: any
  copy?: any
  domain?: any
  range?: any
  nice?: any
  ticks?: any
  tickFormat?: any
  invert?: any
}

const fisheye = {
  circular: () => {
    let radius = 200
    let distortion = 2
    let k0: number
    let k1: number
    let focus: number[] | number = [0, 0]

    const _fisheye: IFisheye = (d: any) => {
      const dx = d.x - (focus as number[])[0]
      const dy = d.y - (focus as number[])[1]
      const dd = Math.sqrt(dx * dx + dy * dy)
      if (!dd || dd >= radius) return { x: d.x, y: d.y, z: dd >= radius ? 1 : 10 }
      const k = k0 * (1 - Math.exp(-dd * k1)) / dd * 0.75 + 0.25
      return { x: (focus as number[])[0] + dx * k, y: (focus as number[])[1] + dy * k, z: Math.min(k, 10) }
    }

    function rescale () {
      k0 = Math.exp(distortion)
      k0 = k0 / (k0 - 1) * radius
      k1 = distortion / radius
      return _fisheye
    }

    _fisheye.radius = (_: number) => {
      if (!arguments.length) return radius
      radius = +_
      return rescale()
    }

    _fisheye.distortion = (_: number) => {
      if (!arguments.length) return distortion
      distortion = +_
      return rescale()
    }

    _fisheye.focus = (_: number) => {
      if (!arguments.length) return focus
      focus = _
      return _fisheye
    }

    return rescale()
  },
  scale: (scaleType: any) => {
    return d3FisheyeScale(scaleType(), 50, 0)
  }
}

function d3FisheyeScale (scale: any, d: number, a: number): IFisheye {
  const _fisheye: IFisheye = (_: number) => {
    const x = scale(_)
    const left = x < a
    const range = d3.extent(scale.range()) as number[]
    const min: number = range[0]
    const max = range[1]
    let m = left ? a - min : max - a
    if (m === 0) m = max - min
    return (left ? -1 : 1) * m * (d + 1) / (d + (m / Math.abs(x - a))) + a
  }

  _fisheye.invert = (xf: number) => {
    const left = xf < a
    const range = d3.extent(scale.range()) as number[]
    const min = range[0]
    const max = range[1]
    let m = left ? a - min : max - a
    if (m === 0) m = max - min
    return scale.invert(a + m * (xf - a) / ((d + 1) * m - (left ? -1 : 1) * d * (xf - a)))
  }

  _fisheye.distortion = (_: number) => {
    if (!arguments.length) return d
    d = +_
    return _fisheye
  }

  _fisheye.focus = (_: number) => {
    if (!arguments.length) return a
    a = +_
    return _fisheye
  }

  _fisheye.copy = () => {
    return d3FisheyeScale(scale.copy(), d, a)
  }

  _fisheye.nice = scale.nice
  _fisheye.ticks = scale.ticks
  _fisheye.tickFormat = scale.tickFormat

  _fisheye.domain = (domainParam: number[]) => {
    // scale.domain.apply(scale, domainParam)
    scale.domain(domainParam)
    return _fisheye
  }

  _fisheye.range = (rangeParam: number[]) => {
    // scale.range.apply(scale, rangeParam)
    scale.range(rangeParam)
    return _fisheye
  }
  return _fisheye
}

export default fisheye
