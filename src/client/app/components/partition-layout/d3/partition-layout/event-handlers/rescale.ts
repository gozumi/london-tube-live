import { Selection } from 'd3'

import { IScale, translateNodePosition } from '../../_node_utils'
import { NODE_TEXT_HTML } from '../_constants'
import { calculateNodeHeight, calculateNodeWidth } from '../calculation-handlers'

/**
 *
 * @param nodeSelection
 * @param scale
 * @param aggregationPointOrder
 */
export function rescale (
  nodeSelection: Selection<any, any, any, {}>,
  scale: IScale,
  aggregationPointOrder: any[]
) {
  const transition = nodeSelection
    .transition()
    .duration(10)
    .attr('transform', (d: any) => translateNodePosition(d, aggregationPointOrder, scale))

  transition
    .selectAll('rect')
    .attr('width', (d) => calculateNodeWidth(d, scale))
    .attr('height', (d) => calculateNodeHeight(d, scale))

  transition
    .selectAll(`.${NODE_TEXT_HTML}`)
    .attr('style', (d: any) => {
      const rectWidth = scale.x(d.y1) - scale.x(d.y0) - 5
      const rectHeight = scale.y(d.x1) - scale.y(d.x0) - 3
      return `width: ${rectWidth}px; height: ${rectHeight}px; padding: 3px 0 0 5px; margin: 0`
    })
}
