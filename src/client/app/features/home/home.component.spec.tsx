import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import * as React from 'react'

import Home from './home.component'

describe('feature: Home', () => {
  it('should render correctly', () => {
    const home = shallow(<Home />)
    expect(shallowToJson(home)).toMatchSnapshot()
  })
})
