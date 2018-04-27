import { hierarchy, HierarchyNode, partition as d3Partition, scaleLinear, select } from 'd3'
import { Subject } from 'rxjs'

import { IDrawingSelections, IPartitionHierarchy, NodeHandler, PartitionHierarchyNode } from '../_interfaces'
import { IScale } from '../_node_utils'
import { CLICK, COLUMN_GROUP, DOUBLE_CLICK, GRAPH_CLASS } from './_constants'
import { drawColumn } from './draw'
import { updateScaleToZoom, zoomInOnMousePointer, zoomInOnNode } from './event-handlers/zoom'

export interface ID3PartitionProps {
  domNode: SVGSVGElement
  aggregations: IPartitionHierarchy
  aggregationChangeHandler: (order: string[]) => void
  customNodeHtmlHandler?: NodeHandler
  customNodeClassHandler?: NodeHandler
  customNodeColourHandler?: NodeHandler
}

/**
 * Draws a partition layout.
 * @param props The properties used to define the drawing
 */
export function renderD3PartitionLayout (props: ID3PartitionProps) {
  const {
    aggregations,
    domNode,
    aggregationChangeHandler,
    customNodeHtmlHandler,
    customNodeClassHandler,
    customNodeColourHandler
  } = props

  // terminate the function if there are no aggregations.
  if (!aggregations) {
    return
  }

  const { width, height } = domNode ? domNode.getBoundingClientRect() : { width: 0, height: 0 }
  const resolution = { width: 10000000, height: 10000000 }

  // remove old graph
  const svg = select(domNode)

  svg
    .selectAll(`.${GRAPH_CLASS}`)
    .remove()

  const graph = select(domNode)
    .append('g')
    .attr('class', GRAPH_CLASS)

  const partition = d3Partition()
    .size([resolution.height, resolution.width])
    .round(true)

  const root = hierarchy(aggregations)
  root.sum((d: any) => d.value)
  partition(root)
  const data: Array<HierarchyNode<IPartitionHierarchy>> = root.descendants()

  const scale: IScale = {
    height: resolution.height,
    width: resolution.width,
    x: scaleLinear().domain([(data[0] as any).y1, resolution.width]).range([0, width]),
    xOrigin: (data[0] as any).y1,
    y: scaleLinear().domain([0, resolution.height]).range([0, height]),
    yOrigin: 0
  }

  const aggregationPointOrder: string[] = []

  // split column data
  const columnData: Map<string, PartitionHierarchyNode[]> = new Map()

  for (const datum of data) {
    const { type } = datum.data
    const columnArray = columnData.get(type) || []
    columnData.set(type, columnArray)
    columnArray.push(datum)
  }

  const columnSelections: Map<string, IDrawingSelections> = new Map()
  columnData.forEach((column, key) => {
    const columnGroup = graph
      .append('g')
      .attr('class', `${COLUMN_GROUP} ${COLUMN_GROUP}-${key}`)
    columnSelections.set(
      key,
      drawColumn({
        aggregationChangeHandler,
        aggregationPointOrder,
        columnData: column,
        columnGroup,
        customNodeClassHandler,
        customNodeColourHandler,
        customNodeHtmlHandler,
        scale
      })
    )
  })

  const clickText$: Subject<() => void> = new Subject()
  clickText$
    .debounceTime(200)
    .subscribe((cb) => cb())

  columnSelections.forEach((colSel) => {
    const { arrows, html } = colSel

    html
      .on(DOUBLE_CLICK, (d: PartitionHierarchyNode) => {
        clickText$.next(() => {
          zoomInOnMousePointer(d, scale, columnSelections, aggregationPointOrder)
        })
      })
      .on(CLICK, (d: PartitionHierarchyNode) => {

        clickText$.next(() => {
          if (scale.y(d.x0) === 0 && scale.y(d.x1) === height) {
            return
          }

          updateScaleToZoom(scale, d)
          columnSelections.forEach((colSelInner) => {
            const nodesInner = colSelInner.nodes
            const rectanglesInner = colSelInner.rectangles
            const textInner = colSelInner.html
            zoomInOnNode(d, nodesInner, rectanglesInner, textInner, scale, aggregationPointOrder)
          })
        })
      })

    arrows
      .on(CLICK, (d: PartitionHierarchyNode) => {
        const { parent } = d
        updateScaleToZoom(scale, parent)
        columnSelections.forEach((colSelInner) => {
          const nodesInner = colSelInner.nodes
          const rectanglesInner = colSelInner.rectangles
          const htmlInner = colSelInner.html
          zoomInOnNode(parent, nodesInner, rectanglesInner, htmlInner, scale, aggregationPointOrder)
        })
      })
  })
}
