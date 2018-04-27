import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.component.css'

export interface INavigationProps {
  data: INavigationItem[]
}

export interface INavigationItem {
  iconClass: string,
  label?: string,
  link: string
}

export default function Navigation (props: INavigationProps) {
  const { data } = props

  return (
    <nav className='navigation'>
      {renderNavigationItems(data)}
    </nav>
  )
}

function renderNavigationItems (data: INavigationItem[]) {
  return (
    <ul className='navigation__list'>
      {data.map(renderNavigationItem)}
    </ul>
  )
}

function renderNavigationItem (item: INavigationItem, idx: number) {
  const { label, link } = item

  return (
    <li className='navigation__item' key={idx}>
      <NavLink activeClassName='navigation__item-icon--active' to={link}>
        <span>{label}</span>
      </NavLink>
      <span className='navigation__item-label'>
        {label}
      </span>
    </li>
  )
}
