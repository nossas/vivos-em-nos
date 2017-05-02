import { h } from 'preact' /** @jsx h */

const FormGroup = ({ className, children, meta: { touched, error, warning } }) => (
  <div className={`form-group ${className}`}>
    {children}
    {touched && (
      (error && <span className="FieldError">{error}</span>) ||
      (warning && <span className="FieldWarning">{warning}</span>)
    )}
  </div>
)

FormGroup.defaultProps = {
  className: '',
}

export default FormGroup
