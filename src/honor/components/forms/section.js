import { h } from 'preact' /** @jsx h */

export default ({ header, children }) => (
  <div>
    {header && <h2>{header}</h2>}
    {children}
  </div>
)
