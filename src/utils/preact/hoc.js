import { h } from 'preact' /** @jsx h */

export default (HOC, Children) => props => (
  <HOC {...props}>
    <Children {...props} />
  </HOC>
)
