import { h } from 'preact' /** @jsx h */
import Loader from './loader'

//
// @param loading <Boolean> prop received by graphql
// @param active <Boolean> prop received loader state
//
export default ({ children, active, loading }) => (
  <div className="components--loader-hoc">
    {children}
    {(active || loading) ? <Loader /> : <div />}
  </div>
)
