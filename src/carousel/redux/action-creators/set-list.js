import { createAction } from '../../../utils/redux'
import * as t from '../action-types'

export default list => createAction(t.SET_LIST, list)
