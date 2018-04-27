import './partition-layout.component.css'

import * as React from 'react'

import { renderD3PartitionLayout } from './d3/partition-layout'

/* tslint:disable:max-line-length */
export interface IPartitionLayoutProps {
  aggregations: IAggregation
  handleAggregationChange: (order: string[]) => void
  nodeHtmlHandler: (d: any) => string
  className?: string
}

export interface IAggregation {
  aggregationType: string
  name: string
  children?: IAggregation[]
}

/**
 *
 * @param props
 */
export default function PartitionLayout (props: IPartitionLayoutProps) {
  const { className, aggregations, handleAggregationChange, nodeHtmlHandler } = props
  const baseClass = 'partition-layout'
  const componentClass = className ? `${baseClass} ${className}` : baseClass
  return (
    <section className={componentClass}>
      <canvas
        className='partition-layout__drawing-area'
        ref={(domNode) => renderLayout(domNode, aggregations, handleAggregationChange, nodeHtmlHandler)}
      />
    </section>
  )
}

/**
 * Invokes a call to the D3 function that renders a D3 Partition layout of the given.
 * This function delays the calling of the D3 function until after the
 * page is fully renderered and CSS has been applied. This ensures that the D3 function
 * draws the partition layout to the correct DOM node dimensions.
 * @param domNode The DOM node to render the D£ layout in
 * @param aggregations The aggregations to be used draw in the D3 layout
 */
function renderLayout (domNode: HTMLCanvasElement, aggregations: IAggregation, handleAggregationChange: (order: string[]) => void, nodeHtmlHandler: (d: any) => string) {
  setTimeout(() => {
    window.requestAnimationFrame(() => {
      renderD3PartitionLayout({
        aggregations,
        domNode,
        handleAggregationChange,
        nodeHtmlHandler
      })
    })
  }, 0)
}
