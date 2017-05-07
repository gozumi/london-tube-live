import * as React from 'react'
import { SignIn } from '../components/sign-in/sign-in.component'

export interface HelloProps {
  compiler: string
  framework: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, undefined> {
  render() {
    return (
      <div>
        <h1 className='some-class'>
          Hello! from {this.props.compiler} and {this.props.framework}!
        </h1>
      </div>
    )
  }
}
