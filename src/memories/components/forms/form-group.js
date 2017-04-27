import { h } from 'preact' /** @jsx h */

export default ({ children, htmlForm, label, meta: { touched, error, warning } }) => (
  <div>
    {children}
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)
