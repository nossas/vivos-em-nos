import { connect } from 'preact-redux'
import * as MenuActions from '../redux/action-creators'
import MenuItem from './menu-item'

export default connect(undefined, MenuActions)(MenuItem)
