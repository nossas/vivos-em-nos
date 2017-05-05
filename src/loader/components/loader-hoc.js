import { h, Component } from 'preact' /** @jsx h */
import { scrollStrategy } from '~src/utils/navigation'
import Loader from './loader'

export default SelectorComponent => class LoaderHOC extends Component {
  componentWillReceiveProps(nextProps) {
    const { active, loading } = this.props
    const hasActiveChanged = active !== nextProps.active
    const hasLoadingChanged = loading !== nextProps.loading

    if (hasActiveChanged || hasLoadingChanged) scrollStrategy()
  }

  render() {
    //
    // @props active <Boolean> prop received loader state
    // @props loading <Boolean> prop received by graphql
    //
    const { children, active, loading } = this.props

    return (
      <SelectorComponent {...this.props}>
        {children}
        {(active || loading) ? <Loader /> : <div />}
      </SelectorComponent>
    )
  }
}
