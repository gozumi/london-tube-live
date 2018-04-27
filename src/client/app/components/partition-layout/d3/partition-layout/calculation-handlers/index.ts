import { IScale } from '../../_node_utils'

/**
 * Calculates the width of the current node.
 * @param d The current datum
 * @param scale The scale to use in the calculation
 */
export function calculateNodeWidth (d: any, scale: IScale) {
  const rectWidth = scale.x(d.y1) - scale.x(d.y0)
  return rectWidth > 1 ? rectWidth - 1 : 0
}

/**
 * Caluculates the height of the current node.
 * @param d The current datum
 * @param scale The scale to use in the calculation
 */
export function calculateNodeHeight (d: any, scale: IScale) {
  const rectHeight = scale.y(d.x1) - scale.y(d.x0)
  return rectHeight > 1 ? rectHeight - 1 : 0
}
