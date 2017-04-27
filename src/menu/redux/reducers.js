import * as t from './action-types'

export const initialState = {
  active: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.SET_ACTIVE:
      return { ...state, active: action.payload }

    default:
      return state
  }
}
