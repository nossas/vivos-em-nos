import { createAction } from '../../../utils/redux'
import * as t from '../action-types'

export default active => createAction(t.SET_ACTIVE, active)
