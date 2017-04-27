import * as t from './action-types'

export const initialState = {
  list: [],
  currentIndex: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.SET_LIST:
      return { ...state, list: action.payload }

    case t.SHOW_NEXT_ITEM:
      const isLast = state.currentIndex === state.list.length - 1
      return { ...state, currentIndex: isLast ? 0 : state.currentIndex + 1 }

    case t.SHOW_PREV_ITEM:
      const isFirst = state.currentIndex === 0
      return { ...state, currentIndex: isFirst ? state.list.length - 1 : state.currentIndex - 1 }

    default:
      return state
  }
}
