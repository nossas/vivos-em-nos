import { h, Component } from 'preact' /** @jsx h */
import { scrollStrategy } from '~src/utils/navigation'

export default WrappedComponent => class LoaderHOC extends Component {
  componentWillReceiveProps(nextProps) {
    //
    // @props active <Boolean> prop received loader state
    // @props loading <Boolean> prop received by graphql
    // @props setActive <Function> action received by connect
    //
    const { active, loading, setActive } = this.props
    const hasActiveChanged = active !== nextProps.active
    const hasLoadingChanged = loading !== nextProps.loading

    if (hasActiveChanged || hasLoadingChanged) scrollStrategy()

    if (nextProps.loading) setActive(true)
    else setActive(false)
  }

  render() {
    return <WrappedComponent {...this.props} />
  }
}
