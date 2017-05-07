import * as React from 'react'
import store from '../../state/store'
import Auth from '../../components/auth/auth.component'

export class Home extends React.Component<undefined, undefined> {
  render() {
    return (
      <section className='home'>
        <Auth />
        <h1 className='some-class'>
          Hello! from
        </h1>
      </section>
    )
  }
}
