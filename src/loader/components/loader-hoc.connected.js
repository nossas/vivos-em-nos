import { connect } from 'preact-redux'
import LoaderSelector from '../redux/selectors'
import LoaderHOC from './loader-hoc'

const mapStateToProps = state => ({
  active: LoaderSelector(state).isActive(),
})

export default connect(mapStateToProps)(LoaderHOC)
