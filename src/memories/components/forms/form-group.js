import { h } from 'preact' /** @jsx h */

export default ({ fieldClassName, children, meta: { touched, error, warning } }) => (
  <div className={`FormGroup ${fieldClassName}`}>
    {children}
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)
