import { event, Selection } from 'd3'

import { updateAggegationPointTypePosition, updateOriginOnDatum } from '../../_node_utils'
import { NODE_CLASS_ACTIVE, NODE_CLASS_DROPABLE } from '../_constants'

/**
 * Initiates the start of drag of a specific node in the layout.
 * @param d The nodes data
 */
export function startColumnDrag (column: Selection<any, any, any, any>) {
  column
    .classed(NODE_CLASS_ACTIVE, true)
}

/**
 * Implements the drag of a specific node in the layout.
 * @param d The nodes data
 */
export function dragColumn (
  aggregationType: string,
  aggregationPointOrder: any[],
  column: Selection<any, any, any, any>
) {
  column
    .attr('transform', (d: any) => `translate(${event.x}, ${d.origin.y})`)
    .classed(NODE_CLASS_DROPABLE, () => {
      return isAggregationPointRepositioned(
        aggregationPointOrder,
        aggregationType,
        event.x
      )
    })
}

/**
 * Ends a drag of a specific node in the layout. It does this by determining wether the coloumn
 * of aggregation that has been dragged has been moved to a new position within the sequence of
 * aggregation order.
 * @param d The nodes data
 */
export function endColumnDrag (
  aggregationType: string,
  aggregationPointOrder: any[],
  columnSelection: Selection<any, any, any, {}>,
  handleChangeAggregation: (order: string[]) => void
) {
  if (isAggregationPointRepositioned(aggregationPointOrder, aggregationType, event.x)) {
    columnSelection
    .classed('active', (d: any) => {
      d.origin.x = event.x
      return false
    })
    handleChangeAggregation(
      aggregationPointOrder
        .map((type) => type.symbol === aggregationType ? { ...type , x: event.x } : type)
        .sort((a, b) => {
          if (a.x < b.x) { return -1 }
          if (a.x > b.x) { return 1 }
          return 0
        })
        .map((type) => type.symbol)
    )
  } else {
    columnSelection
      .transition()
      .duration(300)
      .attr('transform', (d: any) => `translate(${d.origin.x}, ${d.origin.y})`)
    columnSelection
      .classed(NODE_CLASS_ACTIVE, false)
  }
}

/**
 *
 * @param aggregationPointOrder
 * @param aggregationType
 * @param xPos
 */
function isAggregationPointRepositioned (
  aggregationPointOrder: any[],
  aggregationType: string,
  xPos: number
) {
  const i = aggregationPointOrder.findIndex((el) => el.symbol === aggregationType)

  return (i > 0 && xPos < aggregationPointOrder[i - 1].x)
    || ((i + 1) < aggregationPointOrder.length && xPos > aggregationPointOrder[i + 1].x)
}
