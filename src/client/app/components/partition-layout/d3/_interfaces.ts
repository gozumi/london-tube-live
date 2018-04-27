import { HierarchyNode, Selection } from 'd3'

export interface IPartitionHierarchy {
  title: string
  type: string
  value?: number
  children?: IPartitionHierarchy[]
}

export interface IPartitionHierarchyDimensions {
  x0?: number
  x1?: number
  y0?: number
  y1?: number
  origin?: {
    x: number
    y: number
  }
}

export type PartitionHierarchyNode = HierarchyNode<IPartitionHierarchy> & IPartitionHierarchyDimensions

export interface IDrawingSelections {
  arrows: Selection<any, any, any, any>
  nodes: Selection<any, any, any, any>
  rectangles: Selection<any, any, any, any>
  html: Selection<any, any, any, any>
}

export type NodeHandler = (d: PartitionHierarchyNode) => string
