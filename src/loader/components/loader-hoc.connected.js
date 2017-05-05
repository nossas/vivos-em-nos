import { connect } from 'preact-redux'
import LoaderSelector from '../redux/selectors'
import loaderHOC from './loader-hoc'

const mapStateToProps = state => ({
  active: LoaderSelector(state).isActive(),
})

export default WrappedComponent => connect(mapStateToProps)(
  loaderHOC(WrappedComponent),
)
