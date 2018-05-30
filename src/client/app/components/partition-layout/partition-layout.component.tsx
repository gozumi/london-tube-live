import './partition-layout.component.css'

import { IPartitionHierarchy, NodeHandler, renderD3PartitionLayout } from 'interactive-partition-layout'
import * as React from 'react'

// xximport { IPartitionHierarchy, NodeHandler } from './d3/_interfaces'

/* tslint:disable:max-line-length */
export interface IPartitionLayoutProps {
  aggregations: IPartitionHierarchy
  aggregationChangeHandler: (order: string[]) => void
  customNodeHtmlHandler?: (d: any) => string
  className?: string
  customNodeClassHandler?: NodeHandler
  customNodeColourHandler?: NodeHandler
}

/**
 *
 * @param props
 */
export default function PartitionLayout (props: IPartitionLayoutProps) {
  const { className, aggregations, aggregationChangeHandler, customNodeHtmlHandler, customNodeClassHandler, customNodeColourHandler } = props
  const baseClass = 'partition-layout'
  const componentClass = className ? `${baseClass} ${className}` : baseClass
  return (
    <section className={componentClass}>
      <svg
        className='partition-layout__drawing-area'
        ref={(domNode) => renderLayout(domNode, aggregations, aggregationChangeHandler, customNodeHtmlHandler, customNodeClassHandler, customNodeColourHandler)}
      >
        <defs>
          <path id='zoom-out-arrow' className='partition-layout__arrow' d='M39,14.342c0,-1.601 -0.64,-3.135 -1.777,-4.262c-1.138,-1.127 -2.678,-1.752 -4.279,-1.737c-7.053,0.066 -17.749,0.166 -17.749,0.166c0,0 0,-3.089 0,-6.057c0,-0.656 -0.625,-1.231 -1.525,-1.402c-0.899,-0.171 -1.849,0.105 -2.317,0.673c-3.505,4.251 -8.387,10.174 -10.074,12.22c-0.372,0.451 -0.372,1.007 0,1.458c1.792,2.174 7.192,8.724 10.714,12.997c0.39,0.473 1.182,0.703 1.931,0.56c0.75,-0.142 1.271,-0.621 1.271,-1.168c0,-3.207 0,-6.955 0,-6.955c0,0 10.753,0 17.805,0c1.591,0 3.117,-0.632 4.243,-1.757c1.125,-1.125 1.757,-2.652 1.757,-4.243c0,-0.164 0,-0.328 0,-0.493Z'/>
        </defs>
      </svg>
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
function renderLayout (
  domNode: SVGSVGElement,
  aggregations: IPartitionHierarchy,
  aggregationChangeHandler: (order: string[]) => void,
  customNodeHtmlHandler: (d: any) => string,
  customNodeClassHandler?: NodeHandler,
  customNodeColourHandler?: NodeHandler
) {
  setTimeout(() => {
    window.requestAnimationFrame(() => {
      renderD3PartitionLayout({
        aggregationChangeHandler,
        aggregations,
        customNodeClassHandler,
        customNodeColourHandler,
        customNodeHtmlHandler,
        domNode
      })
    })
  }, 0)
}
