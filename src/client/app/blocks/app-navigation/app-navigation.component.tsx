import './app-navigation.component.css'

import Navigation, { INavigationItem } from 'client/app/components/navigation/navigation.component'
import * as i18next from 'i18next'
import * as React from 'react'

const navigationData: INavigationItem[] = [
  {
    iconClass: 'favorite_border',
    label: i18next.t('navigation.home'),
    link: '/home'
  }
]

export default function AppNavigation () {
  return (
    <Navigation data={navigationData}/>
  )
}
