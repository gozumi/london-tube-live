import { ScaleLinear } from 'd3'

import { NodeHandler, PartitionHierarchyNode } from '../_interfaces'
import { AGGREGATION_CLASS, NODE_CLASS } from '../partition-layout/_constants'

export interface IScale {
  x: ScaleLinear<number, number>
  xOrigin: number
  y: ScaleLinear<number, number>
  yOrigin: number
  width: number
  height: number
}

/**
 * Sets the classes associated with the node.
 * @param d The nodes datum
 */
export function setNodeClass (d: PartitionHierarchyNode, customClassHandler: (d: PartitionHierarchyNode) => string) {
  const { type } = d.data
  const aggregationTypeClass = type ? `${AGGREGATION_CLASS}__${type}` : ''
  const typeClass = `${NODE_CLASS}--${d.children ? 'internal' : 'leaf'}`

  let customClass: string = ''
  if (customClassHandler) {
    customClass = customClassHandler(d)
  }

  return `${NODE_CLASS} ${typeClass} ${aggregationTypeClass} ${customClass}`.trim()
}

/**
 * Produces the HTML for the ;current datum by envoking a custom handler if it has
 * been passed in. If no custom handler was passed in, default html is returned.
 * @param d The current datum
 * @param nodeHtmlHandler A custom handler for producing the nodes' html
 */
export function setNodeHtml (d: PartitionHierarchyNode, customNodeHtmlHandler?: NodeHandler) {
  if (customNodeHtmlHandler) {
    return customNodeHtmlHandler(d)
  } else {
    const { type, value } = d.data
    const opening = '<ul>'
    const closing = '</ul>'
    const typeHtml = `<li>type: ${type}</li>`
    const valueHtml = `<li>value: ${value}</li>`
    return opening + typeHtml + valueHtml + closing
  }
}

/**
 * Produces the colour for the nodes' rectangle.
 * @param d The current datum
 * @param customColourHandler A custom handler for determining the colour of the node
 */
export function setNodeColour (d: PartitionHierarchyNode, customColourHandler: NodeHandler) {
  if (customColourHandler) {
    return customColourHandler(d)
  } else {
    return '#cccccc'
  }
}

/**
 * Calculates the x & y origin coordinates for the node.
 * @param d The nodes datum
 * @param scale The scale to use to calculate coordinates
 */
export function updateOriginOnDatum (d: PartitionHierarchyNode, scale: IScale) {
  d.origin = { x: scale.x(d.y0), y: scale.y(d.x0) }
}

/**
 * Adds the current aggregation point type to the array of current aggregation
 * point types without dupplicating. Also updates the current x position of the
 * aggregation point type.
 * @param d The nodes datum
 * @param types The current list of aggregation point types that have been seen
 * so far
 */
export function updateAggegationPointTypePosition (d: PartitionHierarchyNode, types: any[]) {
  const { type } = d.data
  if (type) {
    const apt = types.find((item) => item.symbol === type)
    if (apt) {
      apt.x = d.origin.x
    } else {
      types.push({ symbol: type, x: d.origin.x })
    }
  }
}

/**
 * Sets the transform associated with the node.
 * @param d The nodes datum
 */
export function setNodeTransform (d: PartitionHierarchyNode) {
  const { x, y } = d.origin
  return `translate(${x}, ${y})`
}

/**
 *
 * @param d
 * @param aggregationPointOrder
 * @param scale
 */
export function translateNodePosition (d: PartitionHierarchyNode, aggregationPointOrder: string[], scale: IScale) {
  updateOriginOnDatum(d, scale)
  updateAggegationPointTypePosition(d, aggregationPointOrder)
  return `translate(${scale.x(d.y0)}, ${scale.y(d.x0)})`
}

/**
 * Calculates the style of the current nodes' html box.
 * @param d The current datum
 * @param scale The scale to use in order to work out the style
 */
export function setNodeHtmlBoxStyle (d: PartitionHierarchyNode, scale: IScale) {
  const rectWidth = scale.x(d.y1) - scale.x(d.y0)
  const rectHeight = scale.y(d.x1) - scale.y(d.x0)
  return `width: ${rectWidth}px; height: ${rectHeight}px; padding: 0; margin: 0`
}
