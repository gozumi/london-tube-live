import { hierarchy, partition as d3Partition, scaleLinear } from 'd3'

import { IAggregation } from '../../partition-layout.component'
import { IScale } from '../_node_utils'

export interface ID3PartitionProps {
  domNode: HTMLCanvasElement
  aggregations: IAggregation
  handleAggregationChange: (order: string[]) => void
  nodeHtmlHandler: (d: any) => string
}

/**
 * Draws a partition layout.
 * @param props The properties used to define the drawing
 */
export function renderD3PartitionLayout (props: ID3PartitionProps) {
  const {
    aggregations,
    domNode
  } = props

  // terminate the function if there are no aggregations.
  if (!aggregations) {
    return
  }

  const { width, height } = domNode ? domNode.getBoundingClientRect() : { width: 0, height: 0 }
  const resolution = { width: 10000000, height: 10000000 }

  // set the dimensions of the layout
  domNode.width = width
  domNode.height = height

  // create the drawing context
  const context = domNode.getContext('2d')
  // remove any old drawings
  context.clearRect(0, 0, width, height)

  // create the partition calculations
  const partition = d3Partition()
    .size([resolution.height, resolution.width])
    .round(true)

  const root = hierarchy(aggregations)
  root.sum((d: any) => d.points)
  partition(root)
  const data: any[] = root.descendants()

  const scale: IScale = {
    height: resolution.height,
    width: resolution.width,
    x: scaleLinear().domain([(data[0]).y1, resolution.width]).range([0, width]),
    y: scaleLinear().domain([0, resolution.height]).range([0, height])
  }

  for (const d of data) {
    d.origin = { x: scale.x(d.y0), y: scale.y(d.x0) }
    const x = d.origin.x
    const y = d.origin.y
    const cellWidth = scale.x(d.y1) - x - 2
    const scaleHeight = scale.y(d.x1) - y
    const cellHeight = scaleHeight > 2 ? scaleHeight - 1 : .13
    context.fillStyle = 'firebrick'
    context.fillRect(x, y, cellWidth, cellHeight)

    if (cellHeight > 12) {
      context.font = '10px serif'
      context.textBaseline = 'hanging'
      context.fillStyle = 'white'
      context.fillText(d.data.title, x + 3, y + 3)
    }
  }
}
