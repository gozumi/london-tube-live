import { Selection } from 'd3'

import { IDrawingSelections, PartitionHierarchyNode } from '../../_interfaces'
import { IScale, setNodeHtmlBoxStyle, translateNodePosition } from '../../_node_utils'
import { NODE_ARROW, NODE_CLASS } from '../_constants'
import { calculateNodeHeight, calculateNodeWidth } from '../calculation-handlers'

/**
 * Zooms in on a specific selection in the layout.
 * @param datum The node's data
 * @param nodeSelection The selection to zoom
 * @param scale The scale to use with the zoom
 */
export function zoomInOnNode (
  datum: PartitionHierarchyNode,
  nodeSelection: Selection<any, any, any, {}>,
  rectangleSelection: Selection<any, any, any, any>,
  textSelection: Selection<any, any, any, any>,
  scale: IScale,
  aggregationPointOrder: string[]
) {
  const duration = 750
  nodeSelection
    .transition()
    .duration(duration)
    .attr('transform', (d: any) => translateNodePosition(d, aggregationPointOrder, scale))

  rectangleSelection
    .transition()
    .duration(duration)
    .attr('width', (d) => calculateNodeWidth(d, scale))
    .attr('height', (d) => calculateNodeHeight(d, scale))

  textSelection
    .transition()
    .duration(duration)
    .attr('style', (d) => setNodeHtmlBoxStyle(d, scale))
    .style('height', (d) => {
      const offset = d.parent && (d === datum) ? 40 : 0
      const rectHeight = scale.y(d.x1) - scale.y(d.x0) - offset
      return `${rectHeight}px`
    })
    .style('padding-top', (d: PartitionHierarchyNode) => {
      const offset = d.parent && (d === datum) ? 40 : 0
      return `${offset}px`
    })

  const selectedNodeClass = `${NODE_CLASS}--selected`
  nodeSelection
    .classed(selectedNodeClass, (d) => d === datum)
    .select(`.${NODE_ARROW}`)
    .attr('xlink:href', (d) => d.parent && (d === datum) ? '#zoom-out-arrow' : null)
}

/**
 * This function updates th given scale in order to focus the viewing
 * area on the given datum.
 * @param scale The scale to be updated
 * @param datum The datum used to update the scale
 */
export function updateScaleToZoom (scale: IScale, datum: PartitionHierarchyNode): IScale {
  scale.x.domain([datum.parent ? datum.y0 : datum.y1, scale.width])
  scale.y.domain([datum.x0, datum.x1])

  return scale
}

/**
 *
 * @param nodeSelection
 * @param rectangleSelection
 * @param textSelection
 * @param scale
 * @param aggregationPointOrder
 */
export function resizeColumns (
  nodeSelection: Selection<any, any, any, {}>,
  rectangleSelection: Selection<any, any, any, any>,
  textSelection: Selection<any, any, any, any>,
  scale: IScale,
  aggregationPointOrder: string[]
) {
  const duration = 750
  nodeSelection
    .transition()
    .duration(duration)
    .attr('transform', (d: any) => translateNodePosition(d, aggregationPointOrder, scale))

  rectangleSelection
    .transition()
    .duration(duration)
    .attr('width', (d) => calculateNodeWidth(d, scale))
    .attr('height', (d) => calculateNodeHeight(d, scale))

  textSelection
    .transition()
    .duration(duration)
    .attr('style', (d) => setNodeHtmlBoxStyle(d, scale))
    .style('height', (d) => {
      const rectHeight = scale.y(d.x1) - scale.y(d.x0)
      return `${rectHeight}px`
    })

  nodeSelection
    .select(`.${NODE_ARROW}`)
    .attr('xlink:href', null)
}

/**
 *
 * @param d
 * @param resolutionHeight
 * @param scale
 * @param columnSelections
 * @param aggregationPointOrder
 */
export function zoomInOnMousePointer (
  d: PartitionHierarchyNode,
  scale: IScale,
  columnSelections: Map<string, IDrawingSelections>,
  aggregationPointOrder: string[]
) {
  const nodeHeight = d.x1 - d.x0
  let lowerLimit = d.x0 - (nodeHeight * 1.5)
  lowerLimit = lowerLimit < 0 ? 0 : lowerLimit
  let upperLimit = d.x1 + (nodeHeight * 1.5)
  upperLimit = upperLimit > scale.height ? scale.height : upperLimit

  const currentDomain = scale.y.domain()

  if (currentDomain[0] === lowerLimit && currentDomain[1] === upperLimit) {
    scale.y.domain([0, scale.height])
    const domain = scale.x.domain()
    domain[0] = scale.xOrigin
    scale.x.domain(domain)
  } else {
    scale.y.domain([lowerLimit, upperLimit])
  }

  columnSelections.forEach((selection) => {
    const nodesInner = selection.nodes
    const rectanglesInner = selection.rectangles
    const textInner = selection.html
    resizeColumns(nodesInner, rectanglesInner, textInner, scale, aggregationPointOrder)
  })
}
