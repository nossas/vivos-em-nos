import { h } from 'preact' /** @jsx h */

export default ({ fieldClassName, children, meta: { touched, error, warning } }) => (
  <div className={`FormGroup ${fieldClassName}`}>
    {children}
    {touched && ((error && <span className='FieldError'>{error}</span>)
                 || (warning && <span className='FieldWarning'>{warning}</span>))}
  </div>
)
