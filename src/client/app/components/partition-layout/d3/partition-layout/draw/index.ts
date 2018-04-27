import { drag, Selection } from 'd3'

import { IDrawingSelections, NodeHandler, PartitionHierarchyNode } from '../../_interfaces'
import {
  IScale,
  setNodeClass,
  setNodeColour,
  setNodeHtml,
  setNodeHtmlBoxStyle,
  setNodeTransform,
  updateAggegationPointTypePosition,
  updateOriginOnDatum
} from '../../_node_utils'
import { NODE_ARROW, NODE_CLASS, NODE_RECT_CLASS, NODE_TEXT_HTML } from '../_constants'
import { calculateNodeHeight, calculateNodeWidth } from '../calculation-handlers'
import { dragColumn, endColumnDrag, startColumnDrag } from '../event-handlers/column-drag'

export interface IDrawParameters {
  columnGroup: Selection<any,any,any,any>
  columnData: PartitionHierarchyNode[]
  scale: IScale
  aggregationPointOrder: string[]
  aggregationChangeHandler: (order: string[]) => void
  customNodeHtmlHandler: NodeHandler
  customNodeClassHandler: NodeHandler
  customNodeColourHandler: NodeHandler
}

/**
 *
 * @param columnGroup
 * @param columnData
 * @param scale
 * @param aggregationPointOrder
 * @param aggregationChangeHandler
 * @param customNodeHtmlHandler
 * @param customClassHandler
 */
export function drawColumn (params: IDrawParameters): IDrawingSelections {
  const {
    columnGroup,
    columnData,
    scale,
    aggregationPointOrder,
    aggregationChangeHandler,
    customNodeHtmlHandler,
    customNodeClassHandler,
    customNodeColourHandler
  } = params
  const nodes = columnGroup
    .selectAll(`.${NODE_CLASS}`)
    .data(columnData)
    .enter().append('g')
    .attr('class', (d) => setNodeClass(d, customNodeClassHandler))
    .attr('transform', (d) => {
      updateOriginOnDatum(d, scale)
      updateAggegationPointTypePosition(d, aggregationPointOrder)
      return setNodeTransform(d)
    })

  const rectangles = nodes
    .append('rect')
    .attr('class', NODE_RECT_CLASS)
    .attr('x', 1)
    .attr('y', 1)
    .attr('width', (d) => calculateNodeWidth(d, scale))
    .attr('height', (d) => calculateNodeHeight(d, scale))
    .style('fill', (d) => setNodeColour(d, customNodeColourHandler))

  const columnSelection = (nodes as Selection<any, any, any, any>)
    .call(drag()
      .subject((d: PartitionHierarchyNode) => ({ x: d.origin.x, y: d.origin.y }))
      .on('start', () => startColumnDrag(columnSelection))
      .on('drag', (d: PartitionHierarchyNode) => dragColumn(d.data.type, aggregationPointOrder, columnSelection))
      .on('end', (d: PartitionHierarchyNode) => {
        endColumnDrag(
          d.data.type,
          aggregationPointOrder,
          columnSelection,
          aggregationChangeHandler
        )
      })
    )

  const html = nodes
    .append('foreignObject')
    .append('xhtml:div')
    .attr('xmlns', 'http://www.w3.org/1999/xhtml')
    .html((d: PartitionHierarchyNode) => setNodeHtml(d, customNodeHtmlHandler))
    .attr('class', NODE_TEXT_HTML)
    .attr('style', (d: PartitionHierarchyNode) => setNodeHtmlBoxStyle(d, scale))

  const arrows = nodes
    .append('use')
    .attr('class', NODE_ARROW)
    .attr('x', 5)
    .attr('y', 5)

  return { arrows, nodes, rectangles, html }
}
