import { string } from 'prop-types'

interface ICountryMedal {
  country: string
  medals: {
    gold: string
    silver: string
    bronze: string
  }
}

interface IItem {
  country: string
  gold: string
  silver: string
  bronze: string
}

interface IState {
  data: ICountryMedal[]
  selectedItem: IItem | null
  error: string | null
}

type Action =
  | { type: 'ADD'; item: ICountryMedal }
  | { type: 'SELECT'; country: string }
  | { type: 'EDIT'; item: ICountryMedal }
  | { type: 'REMOVE'; country: string }

export const INITIAL_STATE: IState = {
  error: null,
  data: [
    {
      country: 'Nigeria',
      medals: {
        gold: '1',
        silver: '0',
        bronze: '0',
      },
    },
    {
      country: 'Ghana',
      medals: {
        gold: '0',
        silver: '0',
        bronze: '0',
      },
    },
  ],
  selectedItem: null,
}

const medalReducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'ADD':
      const country = action.item.country.toLocaleLowerCase()
      const duplicateCountry = state.data.find(item => item.country.toLocaleLowerCase() === country)

      if (duplicateCountry) {
        return {
          ...state,
          error: 'Country already exists',
        }
      }

      return {
        ...state,
        data: [...state.data, action.item],
      }
    case 'SELECT':
      const selectedItem = state.data.find(i => i.country === action.country) || null
      if (selectedItem) {
        const { country, medals } = selectedItem
        const { gold, silver, bronze } = medals
        return { ...state, selectedItem: { country, gold, silver, bronze } }
      }

      return state
    case 'EDIT':
      const editedData = state.data.map(item =>
        item.country === action.item.country ? { ...item, ...action.item } : item
      )
      return { ...state, data: editedData }
    case 'REMOVE':
      const newData = state.data.filter(({ country }) => country !== action.country)
      return { ...state, data: newData }
    default:
      return state
  }
}

export default medalReducer
