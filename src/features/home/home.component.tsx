import * as React from 'react'
import store from '../../state/store'

export class Home extends React.Component<undefined, undefined> {
  render() {
    return (
      <section className='home'>
        <h1 className='some-class'>
          Hello! from
        </h1>
      </section>
    )
  }
}
