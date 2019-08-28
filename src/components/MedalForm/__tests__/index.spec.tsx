import { shallow } from 'enzyme'
import React from 'react'
import MedalForm from '..'

const onSaveSpy = jest.fn()
const preventDefaultSpy = jest.fn()

describe('Given a MedalForm Component', () => {
  describe('When rendered', () => {
    let MedalFormComponent: any

    beforeAll(() => {
      MedalFormComponent = shallow(<MedalForm onSave={onSaveSpy} />)
    })

    describe('and no the form has not been filled', () => {
      it('should have a disabled button', () => {
        expect(MedalFormComponent.find('button').props('disabled')).toBeTruthy()
      })
    })

    describe('and form is filled', () => {
      interface IFormValues {
        country: string
        gold: string
        silver: string
        bronze: string
      }
      beforeAll(() => {
        type Keys = 'country' | 'gold' | 'silver' | 'bronze'
        const formValues: { [key in Keys]: string } = {
          country: 'China',
          gold: '100',
          silver: '0',
          bronze: '0',
        }
        const formKeys = Object.keys(formValues)

        formKeys.forEach(name => {
          MedalFormComponent.find(`[name="${name}"]`).simulate('change', {
            target: { value: formValues[name as Keys], name },
          })
        })
      })

      describe('and submitted', () => {
        beforeAll(() => {
          MedalFormComponent.find('form').simulate('submit', {
            preventDefault: preventDefaultSpy,
          })
        })

        it('should invoke the onSumbi function', () => {
          expect(preventDefaultSpy).toHaveBeenCalledTimes(1)
          expect(onSaveSpy).toHaveBeenCalledWith({
            country: 'China',
            medals: {
              gold: 100,
              silver: 0,
              bronze: 0,
            },
          })
        })
      })
    })
  })
})
