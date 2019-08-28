import { shallow } from 'enzyme'
import React from 'react'

import MedalTable from '..'

const onDeleteSpy = jest.fn()
const stopPropagationSpy = jest.fn()
const props = {
  data: [
    {
      country: 'China',
      medals: {
        gold: 100,
        silver: 0,
        bronze: 0,
      },
    },
  ],
  onDelete: onDeleteSpy,
}

describe('Given a MedalTable Component', () => {
  describe('When rendered', () => {
    let MedalTableComponent: any

    beforeAll(() => {
      MedalTableComponent = shallow(<MedalTable {...(props as any)} />)
    })

    it('should render a list of countries with their medals', () => {
      expect(MedalTableComponent).toMatchSnapshot()
    })

    describe('and a country is deleted', () => {
      beforeAll(() => {
        MedalTableComponent.find('button').simulate('click', {
          stopPropagation: stopPropagationSpy,
        })
      })

      it('should invoke the onDelete function with the countries name as an argument', () => {
        expect(stopPropagationSpy).toHaveBeenCalledTimes(1)
        expect(onDeleteSpy).toHaveBeenCalledWith('China')
      })
    })
  })
})
