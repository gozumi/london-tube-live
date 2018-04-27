/* tslint:disable:no-unused-variable */
import * as React from 'react'
import './waiting-ripple.componnent.css'

export interface IWaitingProps {
  className?: string
}

/**
 *
 * @param props
 */
export default function WaitingRipple (props: IWaitingProps) {
  const { className } = props
  const baseClass = 'waiting'
  const componentClass = className ? `${baseClass} ${className}` : baseClass

  return (
    <div className={componentClass}>
      <div className='waiting-ripple' />
    </div>
  )
}
