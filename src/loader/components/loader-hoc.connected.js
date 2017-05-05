import { connect } from 'preact-redux'
import LoaderSelector from '~src/loader/redux/selectors'
import * as LoaderActions from '~src/loader/redux/action-creators'
import loaderHOC from './loader-hoc'

const mapStateToProps = state => ({
  active: LoaderSelector(state).isActive(),
})

export default WrappedComponent => connect(
  mapStateToProps,
  LoaderActions,
)(loaderHOC(WrappedComponent))
