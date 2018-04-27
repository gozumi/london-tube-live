import './home.component.css'

import ParitionLayout from 'client/app/blocks/players-stats-layout'
import * as i18next from 'i18next'
import * as React from 'react'

export default function Home () {
  return (
    <section className='feature home'>
      <h1 className='home__header'>{i18next.t('home.title')}</h1>
      <ParitionLayout className='dashboard-notifications' />
    </section>
  )
}
